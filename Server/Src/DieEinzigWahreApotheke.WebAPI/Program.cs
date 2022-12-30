using DieEinzigWahreApotheke.Core.Services;
using DieEinzigWahreApotheke.Infrastructure.Database;
using DieEinzigWahreApotheke.Infrastructure.Models;
using DieEinzigWahreApotheke.Infrastructure.Services;

using DotNet.Testcontainers.Builders;
using DotNet.Testcontainers.Configurations;
using DotNet.Testcontainers.Containers;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

namespace DieEinzigWahreApotheke.WebAPI; 

public static class Program {
	public static TestcontainerDatabase TemporaryDatabaseContainer { get; set; }
	
	public static async Task Main(string[] args) {
		Program.TemporaryDatabaseContainer = new TestcontainersBuilder<PostgreSqlTestcontainer>()
			.WithDatabase(new PostgreSqlTestcontainerConfiguration {
				Database = "ApothekeDatabase",
				Username = "DatabaseUser",
				Password = "DatabasePassword"
			})
			.Build();

		await Program.TemporaryDatabaseContainer.StartAsync();
		
		var builder = WebApplication.CreateBuilder(args);
		
		Program.ConfigureServices(builder);
		
		// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
		builder.Services.AddEndpointsApiExplorer();
		builder.Services.AddSwaggerGen();

		var app = builder.Build();
		Program.ConfigureHttpPipeline(app);
		
		// Create database tables
		using (var scope = app.Services.CreateScope())
			await scope.ServiceProvider.GetRequiredService<ApplicationDbContext>().Database.EnsureCreatedAsync();
		
		await app.RunAsync();
	}
	
	private static void ConfigureServices(WebApplicationBuilder builder) {
		builder.Configuration.AddEnvironmentVariables();

		Program.ConfigureControllers(builder);
		Program.ConfigureScopedServices(builder);
		Program.ConfigureEntityFramework(builder);
		Program.ConfigureIdentity(builder);
		
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
		
		app.UseCors(
			policyBuilder => policyBuilder
				.AllowAnyMethod()
				.AllowAnyHeader()
				.AllowCredentials()
				.SetIsOriginAllowed(o => true)
				.WithExposedHeaders("set-cookie")
		);

		app.UseAuthentication();
		app.UseAuthorization();

		app.MapControllers();
	}
	
	private static void ConfigureControllers(WebApplicationBuilder builder) {
		builder.Services.AddControllers();
	}
	
	private static void ConfigureScopedServices(WebApplicationBuilder builder) {
		builder.Services.AddScoped<IMedicineService, MedicineService>();
		builder.Services.AddScoped<IOrderService, OrderService>();
		builder.Services.AddScoped<IShoppingCartService, ShoppingCartService>();
		builder.Services.AddScoped<IUserService, UserService>();
	}
	
	private static void ConfigureEntityFramework(WebApplicationBuilder builder) {
		builder.Services.AddDbContext<ApplicationDbContext>(
			(serviceProvider, optionsBuilder) => optionsBuilder
				.UseNpgsql(Program.TemporaryDatabaseContainer.ConnectionString)
		);
	}

	private static void ConfigureIdentity(WebApplicationBuilder builder)
	{
		builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
			{
				options.User.RequireUniqueEmail = true;
			})
			.AddEntityFrameworkStores<ApplicationDbContext>()
			.AddDefaultTokenProviders();

		builder.Services.ConfigureApplicationCookie(options => {
			options.Cookie.SameSite = SameSiteMode.None;
		});
	}
}