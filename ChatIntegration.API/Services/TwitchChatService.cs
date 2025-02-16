using ChatIntegration.API.Hubs;
using ChatIntegration.API.Models;
using TwitchLib.Client;
using TwitchLib.Client.Models;
using TwitchLib.Communication.Clients;
using TwitchLib.Communication.Models;

namespace ChatIntegration.API.Services;

public class TwitchChatService : BackgroundService
{
    private readonly ChatHubManager _chatHub;
    private readonly IConfiguration _configuration;
    private TwitchClient? _client;

    public TwitchChatService(ChatHubManager chatHub, IConfiguration configuration)
    {
        _chatHub = chatHub;
        _configuration = configuration;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        var clientOptions = new ClientOptions
        {
            MessagesAllowedInPeriod = 750,
            ThrottlingPeriod = TimeSpan.FromSeconds(30)
        };
        
        var customClient = new WebSocketClient(clientOptions);
        _client = new TwitchClient(customClient);

        _client.OnMessageReceived += async (sender, e) =>
        {
            await _chatHub.BroadcastMessage(new ChatMessage
            {
                Platform = "twitch",
                Username = e.ChatMessage.Username,
                Content = e.ChatMessage.Message,
                Timestamp = DateTime.UtcNow,
                PlatformSpecific = new Dictionary<string, object>
                {
                    { "color", e.ChatMessage.ColorHex },
                    { "subscriber", e.ChatMessage.IsSubscriber },
                    { "mod", e.ChatMessage.IsModerator }
                }
            });
        };

        var twitchUsername = _configuration["Twitch:Username"];
        var twitchToken = _configuration["Twitch:AccessToken"];
        var channelName = _configuration["Twitch:ChannelName"];

        if (string.IsNullOrEmpty(twitchUsername) || string.IsNullOrEmpty(twitchToken) || string.IsNullOrEmpty(channelName))
        {
            throw new InvalidOperationException("Twitch configuration is missing");
        }

        var credentials = new ConnectionCredentials(twitchUsername, twitchToken);
        _client.Initialize(credentials, channelName);
        _client.Connect();

        await Task.Delay(Timeout.Infinite, stoppingToken);
    }

    public override async Task StopAsync(CancellationToken cancellationToken)
    {
        _client?.Disconnect();
        await base.StopAsync(cancellationToken);
    }
}
