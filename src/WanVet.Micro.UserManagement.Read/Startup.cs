
using Autofac.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Nancy;
using Nancy.Owin;
using System;
using System.Collections.Generic;
using WanVet.Infrastructure.Read;
using WanVet.Micro.UserManagement.Read.Domain.Model.UserModel;
using WanVet.Micro.UserManagement.Read.Domain.Model.UserModel.Queries;

namespace WanVet.Micro.UserManagement.Read
{
    internal class Startup
    {
        public void Configure(IApplicationBuilder app)
        {
            app.UseOwin(x => x.UseNancy(opt => { opt.Bootstrapper = new CustomAutofacNancyBootstrapper(); }));
            app.Run(async (context) =>
            {
                await context.Response.WriteAsync(string.Empty);
            });
        }

        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            IoCConfig.BuildContainer(services);
            return new AutofacServiceProvider(IoCConfig.Container);
        }
    }
    public class HomeModule : NancyModule
    {
        private readonly IQueryBus _bus;

        public HomeModule(IQueryBus bus)
        {
            _bus = bus;
            ConfigureRoutes();
        }

        private void ConfigureRoutes()
        {
            Get("/", args => Response.AsJson("WanVet.Micro.UserManagement.Read"));
            Get("/{email}", args => Response.AsJson(_bus.Execute<GetUserQuery, UserReadModel>(new GetUserQuery(args.email))));
            Get("/doctors/{term}", args => Response.AsJson(_bus.Execute<GetDoctorsQuery, List<UserReadModel>>(new GetDoctorsQuery(args.term))));
        }
    }
}
