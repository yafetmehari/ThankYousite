using ChatIntegration.API.Hubs;
using ChatIntegration.API.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddSignalR(options =>
{
    options.EnableDetailedErrors = builder.Environment.IsDevelopment();
    options.MaximumReceiveMessageSize = 32 * 1024; // 32KB
});

// Configure CORS for production
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins(builder.Configuration.GetSection("AllowedOrigins").Get<string[]>() ?? Array.Empty<string>())
               .AllowAnyHeader()
               .AllowAnyMethod()
               .AllowCredentials();
    });
});

// Add chat services
builder.Services.AddSingleton<ChatHubManager>();
builder.Services.AddHostedService<YouTubeChatService>();

// Get port from environment variable or use default
var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";
builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

var app = builder.Build();

// Enable developer exception page in development
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

// Important: Order matters! CORS and routing before endpoints
app.UseCors();
app.UseRouting();

// Map SignalR hub
app.MapHub<ChatHub>("/chathub");

// API endpoints come after SignalR but before static files
app.MapGet("/health", () => Results.Ok(new { status = "healthy" }));

// Static files and default files come after API routes
app.UseDefaultFiles();
app.UseStaticFiles();

// Fallback route comes last
app.MapFallbackToFile("index.html");

app.Run();