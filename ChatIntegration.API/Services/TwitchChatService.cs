using ChatIntegration.API.Hubs;
using ChatIntegration.API.Models;
using System.Timers;

namespace ChatIntegration.API.Services;

public class TwitchChatService : BackgroundService
{
    private readonly ChatHubManager _chatHub;
    private readonly System.Timers.Timer _demoTimer;
    private readonly Random _random = new();
    private readonly string[] _demoUsernames = { "TwitchUser1", "TwitchUser2", "CoolStreamer", "ChatFan" };
    private readonly string[] _demoMessages = {
        "Hello from Twitch!",
        "Great stream today!",
        "LOL 😂",
        "GG",
        "Awesome content!",
        "When is the next stream?",
        "Thanks for streaming!"
    };

    public TwitchChatService(ChatHubManager chatHub, IConfiguration configuration)
    {
        _chatHub = chatHub;
        _demoTimer = new System.Timers.Timer(2000); // Send a message every 2 seconds
        _demoTimer.Elapsed += SendDemoMessage;
    }

    private async void SendDemoMessage(object? sender, ElapsedEventArgs e)
    {
        var message = new ChatMessage
        {
            Platform = "twitch",
            Username = _demoUsernames[_random.Next(_demoUsernames.Length)],
            Content = _demoMessages[_random.Next(_demoMessages.Length)],
            Timestamp = DateTime.UtcNow,
            PlatformSpecific = new Dictionary<string, object>
            {
                { "color", "#" + Convert.ToString(_random.Next(0x1000000), 16).PadLeft(6, '0') },
                { "subscriber", _random.Next(2) == 1 },
                { "mod", _random.Next(5) == 0 }
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