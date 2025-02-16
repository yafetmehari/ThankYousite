using Microsoft.AspNetCore.SignalR;
using ChatIntegration.API.Models;

namespace ChatIntegration.API.Hubs;

public class ChatHub : Hub
{
    private readonly ChatHubManager _manager;

    public ChatHub(ChatHubManager manager)
    {
        _manager = manager;
    }

    public override async Task OnConnectedAsync()
    {
        await _manager.AddConnection(Context.ConnectionId);
        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        await _manager.RemoveConnection(Context.ConnectionId);
        await base.OnDisconnectedAsync(exception);
    }

    public async Task SendMessage(ChatMessage message)
    {
        await Clients.All.SendAsync("ReceiveMessage", message);
    }
}

public class ChatHubManager
{
    private readonly HashSet<string> _connections = new();
    private readonly IHubContext<ChatHub> _hubContext;

    public ChatHubManager(IHubContext<ChatHub> hubContext)
    {
        _hubContext = hubContext;
    }

    public Task AddConnection(string connectionId)
    {
        _connections.Add(connectionId);
        return Task.CompletedTask;
    }

    public Task RemoveConnection(string connectionId)
    {
        _connections.Remove(connectionId);
        return Task.CompletedTask;
    }

    public async Task BroadcastMessage(ChatMessage message)
    {
        await _hubContext.Clients.All.SendAsync("ReceiveMessage", message);
    }
}
