using LeagueSearcherBackend.Options;
using LeagueSearcherBackend.Services;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.Configure<RiotOptions>(
    builder.Configuration.GetSection("RiotOptions"));

builder.Services.AddScoped<RiotApiService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", builder =>
    {
        builder.WithOrigins("http://localhost:5173")
               .AllowAnyHeader()
               .AllowAnyMethod()
               .AllowCredentials();
    });
});

// builder.Services.AddHttpClient<RiotApiService>((serviceProvider, client) =>
// {
//     var riotOptions = serviceProvider.GetRequiredService<IOptions<RiotOptions>>().Value;
//     if (string.IsNullOrEmpty(riotOptions.BaseUrlSuffix))
//     {
//         throw new InvalidOperationException("BaseUrlSuffix in RiotOptions cannot be null or empty.");
//     }
//     client.BaseAddress = new Uri(riotOptions.BaseUrlSuffix);
// });

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers(); 

app.Run();
