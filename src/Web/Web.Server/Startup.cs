using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Web.Server;

public static class Startup
{
    public static void RegisterServices(IServiceCollection services, ConfigurationManager configuration)
    {
        var keyVault = configuration.GetValue<string>("KeyVault") ?? throw new InvalidOperationException();
        var managedIdentityClientId = configuration.GetValue<string>("ManagedIdentityClientId") ?? throw new InvalidOperationException();
        var client = new SecretClient(new Uri(keyVault), new DefaultAzureCredential(new DefaultAzureCredentialOptions { ManagedIdentityClientId = managedIdentityClientId }));
        var connectionString = client.GetSecret("ApplicationDbContextConnection").Value.Value ?? throw new InvalidOperationException();

        services.AddDbContext<ApplicationDbContext>(
            options => options.UseSqlServer(connectionString, options => options.EnableRetryOnFailure()));

        services.AddAuthorizationBuilder()
            .AddPolicy("Admin", policy => policy.RequireClaim("Admin"));

        services.AddIdentityApiEndpoints<ApplicationUser>()
                .AddEntityFrameworkStores<ApplicationDbContext>();

        string corsPolicy = configuration.GetValue<string>("Cors:PolicyName")!;
        string allowedOrigins = configuration.GetValue<string>("Cors:AllowedOrigins")!;
        services.AddCors(options =>
        {
            options.AddPolicy(name: corsPolicy,
                              policy =>
                              {
                                  policy.WithOrigins(allowedOrigins).AllowAnyHeader().AllowAnyMethod();
                              });
        });

        services.AddControllers();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
    }
}
