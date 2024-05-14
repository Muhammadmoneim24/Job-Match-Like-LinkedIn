
using DatabaseProj.Controllers;
using DatabaseProj.Helpers;
using DatabaseProj.Models;
using DatabaseProj.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using System.Text;

namespace DatabaseProj
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddScoped<IAuthService, AuthService>();
            // Add MongoDB settings
            builder.Configuration.AddJsonFile("appsettings.json");
            builder.Services.Configure<MongoDBSettings>(builder.Configuration.GetSection("MongoDBSettings"));

            // Configure MongoDB context
            builder.Services.AddSingleton<AppDbContext>(provider =>
            {
                var settings = provider.GetRequiredService<IOptions<MongoDBSettings>>().Value;
                return new AppDbContext(settings.ConnectionString, settings.DatabaseName);
            });

            // Register IMongoClient
            builder.Services.AddSingleton<IMongoClient, MongoClient>(provider =>
            {
                var settings = provider.GetRequiredService<IOptions<MongoDBSettings>>().Value;
                return new MongoClient(settings.ConnectionString);
            });

            // Register IMongoDatabase
            builder.Services.AddScoped<IMongoDatabase>(provider =>
            {
                var settings = provider.GetRequiredService<IOptions<MongoDBSettings>>().Value;
                var client = provider.GetRequiredService<IMongoClient>();
                return client.GetDatabase(settings.DatabaseName);
            });

            // Register IMongoCollection<Post>
            //builder.Services.AddScoped<IMongoCollection<Post>>(provider =>
            //{
            //    var settings = provider.GetRequiredService<IOptions<MongoDBSettings>>().Value;
            //    var client = provider.GetRequiredService<IMongoClient>();
            //    var database = client.GetDatabase(settings.DatabaseName);
            //    return database.GetCollection<Post>("Posts");
            //});

            // Register IMongoCollection<User>
            builder.Services.AddScoped<IMongoCollection<User>>(provider =>
            {
                var settings = provider.GetRequiredService<IOptions<MongoDBSettings>>().Value;
                var client = provider.GetRequiredService<IMongoClient>();
                var database = client.GetDatabase(settings.DatabaseName);
                return database.GetCollection<User>("Users");
            });

            builder.Services.Configure<JWT>(builder.Configuration.GetSection("JWT"));

            builder.Services.AddScoped<IAuthService, AuthService>();
            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

            }).AddJwtBearer(o =>
            {
                o.RequireHttpsMetadata = false;
                o.SaveToken = false;
                o.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidIssuer = builder.Configuration["JWT:Issuer"],
                    ValidAudience = builder.Configuration["JWT:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Key"]))
                };
            });


            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
