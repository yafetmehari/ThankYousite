using ChatIntegration.API.Hubs;
using ChatIntegration.API.Models;
using Discord;
using Discord.WebSocket;

namespace ChatIntegration.API.Services;

public class DiscordChatService : BackgroundService
{
    private readonly ChatHubManager _chatHub;
    private readonly IConfiguration _configuration;
    private DiscordSocketClient? _client;

    public DiscordChatService(ChatHubManager chatHub, IConfiguration configuration)
    {
        _chatHub = chatHub;
        _configuration = configuration;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        var token = _configuration["Discord:BotToken"];
        if (string.IsNullOrEmpty(token))
        {
            throw new InvalidOperationException("Discord bot token is missing");
        }

        var config = new DiscordSocketConfig
        {
            GatewayIntents = GatewayIntents.MessageContent | GatewayIntents.GuildMessages
        };

        _client = new DiscordSocketClient(config);

        _client.MessageReceived += async (message) =>
        {
            if (message.Author.IsBot) return Task.CompletedTask;

            var channelId = _configuration["Discord:ChannelId"];
            if (message.Channel.Id.ToString() != channelId) return Task.CompletedTask;

            await _chatHub.BroadcastMessage(new ChatMessage
            {
                Platform = "discord",
                Username = message.Author.Username,
                Content = message.Content,
                Timestamp = message.Timestamp.UtcDateTime,
                PlatformSpecific = new Dictionary<string, object>
                {
                    { "authorId", message.Author.Id.ToString() },
                    { "isAdmin", (message.Author as SocketGuildUser)?.GuildPermissions.Administrator ?? false }
                }
            });

            return Task.CompletedTask;
        };

        await _client.LoginAsync(TokenType.Bot, token);
        await _client.StartAsync();

        await Task.Delay(Timeout.Infinite, stoppingToken);
    }

    public override async Task StopAsync(CancellationToken cancellationToken)
    {
        if (_client != null)
        {
            await _client.StopAsync();
            await _client.DisposeAsync();
        }
        await base.StopAsync(cancellationToken);
    }
}
