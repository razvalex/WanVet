using System.IO;
using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Serialization;
using Swashbuckle.Swagger.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Mvc.Authorization;
using System.IdentityModel.Tokens.Jwt;
using System.Collections.Generic;
using IdentityServer4.AccessTokenValidation;
using System;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using MassTransit;
using WanVet.Messaging;
using WanVet.Application.Services.User;
using WanVet.Application.Services.File;
using WanVet.Application.Services.Pet;
using WanVet.Application.Services.Appointment;

namespace WanVet.UI
{
    public class Startup
    {
        private readonly IHostingEnvironment _environment;

        public Startup(IHostingEnvironment env)
        {
            _environment = env;

            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();

            if (env.IsDevelopment())
            {
                // This will push telemetry data through Application Insights pipeline faster, allowing you to view results immediately.
                builder.AddApplicationInsightsSettings(developerMode: true);
                builder.AddUserSecrets();
            }

            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            var cert = new X509Certificate2(Path.Combine(_environment.ContentRootPath, "localhost.pfx"), "local");

            var folderForKeyStore = Configuration["Production:KeyStoreFolderWhichIsBacked"];

            services.AddDataProtection()
                .SetApplicationName("WanVetApp")
                .PersistKeysToFileSystem(new DirectoryInfo(folderForKeyStore));
            //Future development - cannot find method in ProtectData 1.1            
            //.ProtectKeysWithCertificate(cert);

            services.AddCors();

            var policy = new Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicy();

            policy.Headers.Add("*");
            policy.Methods.Add("*");
            policy.Origins.Add("*");
            policy.SupportsCredentials = true;

            services.AddCors(x => x.AddPolicy("corsGlobalPolicy", policy));

            var guestPolicy = new AuthorizationPolicyBuilder()
                .RequireAuthenticatedUser()
                .RequireClaim("scope", "wanvet")
                .Build();

            services.AddAuthorization(options =>
            {
                options.AddPolicy("WanVetAdmin", policyAdmin =>
                {
                    policyAdmin.RequireClaim("role", "wanvet.admin");
                });
                options.AddPolicy("WanVetUser", policyUser =>
                {
                    policyUser.RequireClaim("role", "wanvet.user");
                });
                options.AddPolicy("WanVetStaff", policyStaff =>
                {
                    policyStaff.RequireClaim("role", "wanvet.staff");
                });
                options.AddPolicy("WanVetDoctor", policyDoctor =>
                {
                    policyDoctor.RequireClaim("role", "wanvet.doctor");
                });
            });

            // Add framework services.
            services.AddApplicationInsightsTelemetry(Configuration);

            services.AddSwaggerGen();

            // Add the detail information for the API.
            services.ConfigureSwaggerGen(options =>
            {
                options.SingleApiVersion(new Info
                {
                    Version = "v1",
                    Title = "WanVet Api",
                    Description = "Here is the WanVet Api that is used in underlying application.",
                    TermsOfService = "None",
                    Contact = new Contact { Name = "Razvan Dumitru", Email = "dumitruar@gmail.com" },
                    License = new License { Name = "Use under MIT", Url = "https://opensource.org/licenses/MIT" }
                });

                // Determine base path for the application.
                // var basePath = PlatformServices.Default.Application.ApplicationBasePath;

                // Set the comments path for the swagger json and ui.
                // options.IncludeXmlComments(basePath + "\\TodoApi.xml");
            });

            services.AddMvc(options =>
            {
                options.Filters.Add(new AuthorizeFilter(guestPolicy));
            }).AddJsonOptions(options =>
            {
                options.SerializerSettings.ContractResolver = new DefaultContractResolver();
            });

            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IFileService, FileService>();
            services.AddTransient<IPetService, PetService>();
            services.AddTransient<ICalendarService, CalendarService>();
            services.AddTransient<IAppointmentService, AppointmentService>();
            
            var containerBuilder = new ContainerBuilder();
            containerBuilder.RegisterModule<DefaultModule>();
            containerBuilder.Populate(services);
            return new AutofacServiceProvider(containerBuilder.Build());
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseCors("corsGlobalPolicy");

            app.UseStaticFiles();

            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

            var identityServerValidationOptions = new IdentityServerAuthenticationOptions
            {
                Authority = env.IsDevelopment() ? "https://localhost:44348/" : "https://localhost/IdentityProvider",
                AllowedScopes = new List<string> { "wanvet" },
                ApiSecret = "wanvetSecret",
                ApiName = "wanvet",
                AutomaticAuthenticate = true,
                SupportedTokens = SupportedTokens.Both,
                AutomaticChallenge = true,
            };

            app.UseIdentityServerAuthentication(identityServerValidationOptions);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();

                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true,                
                    ConfigFile = "config/webpack.config.js"
                });

                // NOTE: For SPA swagger needs adding before MVC
                // Enable middleware to serve generated Swagger as a JSON endpoint
                app.UseSwagger();

                // Enable middleware to serve swagger-ui assets (HTML, JS, CSS etc.)
                app.UseSwaggerUi();
            }


            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });
        }
    }

    public class DefaultModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            var busControl = BusConfigurator.Instance.ConfigureBus();

            builder
                .Register(context => busControl)
                .SingleInstance()
                .As<IBusControl>();
            
            busControl.Start();
        }
    }
}
