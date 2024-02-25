using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

// Connect to Azure Key Vault
var keyVault = builder.Configuration.GetValue<string>("KeyVault") ?? throw new InvalidOperationException();
var client = new SecretClient(new Uri(keyVault), new DefaultAzureCredential());

// Connect to DB
var connectionString = client.GetSecret("ApplicationDbContextConnection").Value.Value ?? throw new InvalidOperationException();
builder.Services.AddDbContext<ApplicationDbContext>(
    options => options.UseSqlServer(connectionString, options => options.EnableRetryOnFailure()));

// Add Authorization using .NET Identity
builder.Services.AddAuthorization();
builder.Services.AddIdentityApiEndpoints<ApplicationUser>()
    .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.MapIdentityApi<ApplicationUser>();

app.Run();
