using Infrastructure.Data;
using Web.Server;

var builder = WebApplication.CreateBuilder(args);

Startup.RegisterServices(builder.Services, builder.Configuration);

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