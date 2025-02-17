using ChatIntegration.API.Hubs;
using ChatIntegration.API.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddSignalR();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.SetIsOriginAllowed(_ => true)
               .AllowAnyHeader()
               .AllowAnyMethod()
               .AllowCredentials();
    });
});

// Add chat services
builder.Services.AddSingleton<ChatHubManager>();
builder.Services.AddHostedService<YouTubeChatService>();

// Configure Kestrel to listen on all interfaces
builder.WebHost.UseUrls("http://0.0.0.0:5000");

var app = builder.Build();

// Enable developer exception page in development
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseCors();
app.UseRouting();
app.UseDefaultFiles(); 
app.UseStaticFiles(); 
app.MapHub<ChatHub>("/chathub");

// Fallback to index.html for SPA routing
app.MapFallbackToFile("index.html");

app.Run();