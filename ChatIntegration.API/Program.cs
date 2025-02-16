using ChatIntegration.API.Hubs;
using ChatIntegration.API.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddSignalR();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:5000")
               .AllowAnyHeader()
               .AllowAnyMethod()
               .AllowCredentials();
    });
});

// Add platform services
builder.Services.AddSingleton<ChatHubManager>();
builder.Services.AddHostedService<TwitchChatService>();
builder.Services.AddHostedService<YouTubeChatService>();
builder.Services.AddHostedService<DiscordChatService>();

var app = builder.Build();

app.UseCors();
app.MapHub<ChatHub>("/chathub");

app.Run();
