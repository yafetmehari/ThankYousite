using ChatIntegration.API.Hubs;
using ChatIntegration.API.Models;
using Google.Apis.YouTube.v3;
using Google.Apis.Services;

namespace ChatIntegration.API.Services;

public class YouTubeChatService : BackgroundService
{
    private readonly ChatHubManager _chatHub;
    private readonly IConfiguration _configuration;
    private YouTubeService? _youtubeService;

    public YouTubeChatService(ChatHubManager chatHub, IConfiguration configuration)
    {
        _chatHub = chatHub;
        _configuration = configuration;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        var apiKey = _configuration["YouTube:ApiKey"];
        if (string.IsNullOrEmpty(apiKey))
        {
            throw new InvalidOperationException("YouTube API key is missing");
        }

        _youtubeService = new YouTubeService(new BaseClientService.Initializer()
        {
            ApiKey = apiKey,
            ApplicationName = "ChatIntegration"
        });

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                var channelId = _configuration["YouTube:ChannelId"];
                var liveBroadcastRequest = _youtubeService.Search.List("id");
                liveBroadcastRequest.ChannelId = channelId;
                liveBroadcastRequest.Type = "video";
                liveBroadcastRequest.EventType = SearchResource.ListRequest.EventTypeEnum.Live;

                var liveBroadcast = await liveBroadcastRequest.ExecuteAsync();
                if (liveBroadcast.Items.Any())
                {
                    var videoId = liveBroadcast.Items[0].Id.VideoId;
                    await MonitorLiveChatAsync(videoId, stoppingToken);
                }
            }
            catch (Exception ex)
            {
                // Log error and wait before retrying
                Console.WriteLine($"YouTube chat error: {ex.Message}");
                await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);
            }
        }
    }

    private async Task MonitorLiveChatAsync(string videoId, CancellationToken stoppingToken)
    {
        var chatRequest = _youtubeService!.LiveChatMessages.List("snippet");
        chatRequest.LiveChatId = videoId;

        while (!stoppingToken.IsCancellationRequested)
        {
            var chatMessages = await chatRequest.ExecuteAsync();
            foreach (var message in chatMessages.Items)
            {
                await _chatHub.BroadcastMessage(new ChatMessage
                {
                    Platform = "youtube",
                    Username = message.Snippet.AuthorDisplayName,
                    Content = message.Snippet.DisplayMessage,
                    Timestamp = message.Snippet.PublishedAt ?? DateTime.UtcNow,
                    PlatformSpecific = new Dictionary<string, object>
                    {
                        { "authorChannelId", message.Snippet.AuthorChannelId }
                    }
                });
            }

            await Task.Delay(TimeSpan.FromSeconds(5), stoppingToken);
        }
    }
}
