using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

RegisterServices(builder);

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

static void RegisterServices(WebApplicationBuilder builder)
{
    var keyVault = builder.Configuration.GetValue<string>("KeyVault") ?? throw new InvalidOperationException();
    var managedIdentityClientId = builder.Configuration.GetValue<string>("ManagedIdentityClientId") ?? throw new InvalidOperationException();
    var client = new SecretClient(new Uri(keyVault), new DefaultAzureCredential(new DefaultAzureCredentialOptions { ManagedIdentityClientId = managedIdentityClientId }));
    var connectionString = client.GetSecret("ApplicationDbContextConnection").Value.Value ?? throw new InvalidOperationException();

    builder.Services.AddDbContext<ApplicationDbContext>(
        options => options.UseSqlServer(connectionString, options => options.EnableRetryOnFailure()));

    builder.Services.AddAuthorizationBuilder()
        .AddPolicy("Admin", policy => policy.RequireClaim("Admin"));

    builder.Services.AddIdentityApiEndpoints<ApplicationUser>()
            .AddEntityFrameworkStores<ApplicationDbContext>();

    builder.Services.AddControllers();
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();
}
