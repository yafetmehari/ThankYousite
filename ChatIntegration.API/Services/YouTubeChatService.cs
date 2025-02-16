using ChatIntegration.API.Hubs;
using ChatIntegration.API.Models;
using System.Timers;

namespace ChatIntegration.API.Services;

public class YouTubeChatService : BackgroundService
{
    private readonly ChatHubManager _chatHub;
    private readonly System.Timers.Timer _demoTimer;
    private readonly Random _random = new();
    private readonly string[] _demoUsernames = { "YouTuber123", "VideoFan", "ContentLover", "StreamViewer" };
    private readonly string[] _demoMessages = {
        "First time catching the stream!",
        "Love the content!",
        "Subscribed ❤️",
        "Can't wait for the next video",
        "This is amazing",
        "Greetings from YouTube!",
        "Keep it up! 👍"
    };

    public YouTubeChatService(ChatHubManager chatHub, IConfiguration configuration)
    {
        _chatHub = chatHub;
        _demoTimer = new System.Timers.Timer(3000); // Send a message every 3 seconds
        _demoTimer.Elapsed += SendDemoMessage;
    }

    private async void SendDemoMessage(object? sender, ElapsedEventArgs e)
    {
        var message = new ChatMessage
        {
            Platform = "youtube",
            Username = _demoUsernames[_random.Next(_demoUsernames.Length)],
            Content = _demoMessages[_random.Next(_demoMessages.Length)],
            Timestamp = DateTime.UtcNow,
            PlatformSpecific = new Dictionary<string, object>
            {
                { "authorChannelId", Guid.NewGuid().ToString() }
            }
        };

        await _chatHub.BroadcastMessage(message);
    }

    protected override Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _demoTimer.Start();
        return Task.CompletedTask;
    }

    public override Task StopAsync(CancellationToken cancellationToken)
    {
        _demoTimer.Stop();
        return base.StopAsync(cancellationToken);
    }
}