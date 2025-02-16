using ChatIntegration.API.Hubs;
using ChatIntegration.API.Models;
using System.Timers;

namespace ChatIntegration.API.Services;

public class DiscordChatService : BackgroundService
{
    private readonly ChatHubManager _chatHub;
    private readonly System.Timers.Timer _demoTimer;
    private readonly Random _random = new();
    private readonly string[] _demoUsernames = { "DiscordUser", "ServerMember", "CoolGuy", "ChatMaster" };
    private readonly string[] _demoMessages = {
        "Hello from Discord!",
        "Nice to see everyone here",
        "This chat integration is cool",
        "How's everyone doing?",
        "Just joined from Discord",
        "Love this community!",
        "What's up everyone? 👋"
    };

    public DiscordChatService(ChatHubManager chatHub, IConfiguration configuration)
    {
        _chatHub = chatHub;
        _demoTimer = new System.Timers.Timer(4000); // Send a message every 4 seconds
        _demoTimer.Elapsed += SendDemoMessage;
    }

    private async void SendDemoMessage(object? sender, ElapsedEventArgs e)
    {
        var message = new ChatMessage
        {
            Platform = "discord",
            Username = _demoUsernames[_random.Next(_demoUsernames.Length)],
            Content = _demoMessages[_random.Next(_demoMessages.Length)],
            Timestamp = DateTime.UtcNow,
            PlatformSpecific = new Dictionary<string, object>
            {
                { "authorId", _random.Next(10000, 99999).ToString() },
                { "isAdmin", _random.Next(10) == 0 }
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