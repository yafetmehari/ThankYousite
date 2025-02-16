using ChatIntegration.API.Hubs;
using ChatIntegration.API.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddSignalR();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.SetIsOriginAllowed(_ => true)  // Allow any origin
               .AllowAnyHeader()
               .AllowAnyMethod()
               .AllowCredentials();
    });
});

// Add YouTube chat service
builder.Services.AddSingleton<ChatHubManager>();
builder.Services.AddHostedService<YouTubeChatService>();

var app = builder.Build();

app.UseCors();
app.MapHub<ChatHub>("/chathub");

app.Run("http://0.0.0.0:5000");  // Listen on all interfaces