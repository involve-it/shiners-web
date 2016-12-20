﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DdpNet;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Shiners.WebApp.Data;
using Shiners.WebApp.Models;
using Shiners.WebApp.Services;
using Shiners.WebApp.Renderers;

namespace Shiners.WebApp
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            if (env.IsDevelopment())
            {
                builder.AddUserSecrets();
            }

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
            Renderer = new UnderscoreRenderer(env.WebRootPath.Contains("wwwroot")? env.WebRootPath:env.ContentRootPath, "./homeApp", "./sharedViews");
        }

        public IConfigurationRoot Configuration { get; }
        public UnderscoreRenderer Renderer { get; private set; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            services.AddMvc();
            services.AddScoped<UnderscoreRenderer>((provider) => Renderer);
            services.AddSingleton<Repository.MongoRepository>(new Repository.MongoRepository(Configuration.GetConnectionString("Mongo")));
            //services.AddScoped<MeteorClient>((provider) => new MeteorClient(new Uri("wss://shiners.mobi/websocket")));
            services.AddTransient<IEmailSender, AuthMessageSender>();
            services.AddTransient<ISmsSender, AuthMessageSender>();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();
            //app.UseWebSockets();
            app.UseIdentity();
            
            app.UseMvc(routes =>
            {
                routes.MapRoute("about", "about-us", new { controller = "Home", action = "About" });
                routes.MapRoute("user","user/{id?}", new { controller = "Profile", action = "Index" });
                routes.MapRoute("myChats", "chats/my", new { controller = "Chats", action = "My" });
                routes.MapRoute("chats", "chats/{id?}", new { controller = "Chats", action = "Index" });
                routes.MapRoute("chat", "messages/to/{id}",new {controller="Chats",action="To"});
                routes.MapRoute("myPosts", "posts/my", new { controller = "Posts", action = "My" });
                routes.MapRoute("createPost", "posts/new", new { controller = "Posts", action = "Create" });
                routes.MapRoute("posts", "posts/{id?}",new {controller="Posts",action="Index"});
                
                routes.MapRoute("profile", "profile", new { controller = "Profile", action = "Index" });
                routes.MapRoute(name: "default",template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}