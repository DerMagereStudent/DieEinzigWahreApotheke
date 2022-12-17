using System.Reflection;

using DieEinzigWahreApotheke.Core.Services;
using DieEinzigWahreApotheke.Infrastructure.Services;

using Microsoft.OpenApi.Models;

namespace DieEinzigWahreApotheke.WebAPI; 

public static class Program {
	public static async Task Main(string[] args) {
		var builder = WebApplication.CreateBuilder(args);
		
		Program.ConfigureServices(builder);
		
		// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
		builder.Services.AddEndpointsApiExplorer();
		builder.Services.AddSwaggerGen();

		var app = builder.Build();
		Program.ConfigureHttpPipeline(app);
		await app.RunAsync();
	}
	
	private static void ConfigureServices(WebApplicationBuilder builder) {
		builder.Configuration.AddEnvironmentVariables();

		Program.ConfigureControllers(builder);
		Program.ConfigureScopedServices(builder);
		builder.Services.AddAuthentication().AddCookie();
		
		// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
		builder.Services.AddEndpointsApiExplorer();
		builder.Services.AddSwaggerGen(c => {
				c.SwaggerDoc("v1", new OpenApiInfo {
					Title = "DieEinzigWahreApotheke",
					Version = "v1",
					Description = "An pharmacy web app vulnerable for CSRF attacks."
				});
			}
		);
	}
	
	private static void ConfigureHttpPipeline(WebApplication app) {
		// Configure the HTTP request pipeline.
		if (app.Environment.IsDevelopment()) {
			app.UseSwagger();
			app.UseSwaggerUI();
		}

		app.UseHttpsRedirection();
		
		app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

		app.UseAuthentication();
		app.UseAuthorization();

		app.MapControllers();
	}
	
	private static void ConfigureControllers(WebApplicationBuilder builder) {
		builder.Services.AddControllers();
	}
	
	private static void ConfigureScopedServices(WebApplicationBuilder builder) {
		builder.Services.AddScoped<IMedicineService, MedicineService>();
	}
}