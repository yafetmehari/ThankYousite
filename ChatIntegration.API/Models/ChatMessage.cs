namespace ChatIntegration.API.Models;

public class ChatMessage
{
    public string Platform { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public DateTime Timestamp { get; set; }
    public Dictionary<string, object>? PlatformSpecific { get; set; }
}
