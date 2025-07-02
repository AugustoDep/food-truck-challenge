using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();

// Register your custom service and HttpClient
builder.Services.AddHttpClient<IFoodTruckService, FoodTruckService>();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Food Truck API",
        Version = "v1",
        Description = "This API makes a call to a curated database of food trucks, allowing clients to list, search, and analyze vendors by name, location, or food type."
    });
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalClient", policy =>
    {
        policy.WithOrigins("http://localhost:5000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("AllowLocalClient");

var showSwagger = builder.Configuration.GetValue<bool>("ShowSwagger");

if (showSwagger || app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedProto
});

app.UseForwardedHeaders(); 
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.UseStaticFiles(); 
app.MapFallbackToFile("index.html");

app.Run();