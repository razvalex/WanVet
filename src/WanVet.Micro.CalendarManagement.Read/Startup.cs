using Autofac.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Nancy;
using Nancy.Owin;
using System;
using System.Collections.Generic;
using WanVet.Infrastructure.Read;
using WanVet.Micro.CalendarManagement.Read.Domain.Model.CalendarModel;
using WanVet.Micro.CalendarManagement.Read.Domain.Model.CalendarModel.Queries;

namespace WanVet.Micro.CalendarManagement.Read
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
            Get("/", args => Response.AsJson("WanVet.Micro.CalendarManagement.Read"));
            Get("/{id}/openappointments/{term}", args => Response.AsJson(_bus.Execute<GetOpenAppointmentsQuery, List<AppointmentReadModel>>(new GetOpenAppointmentsQuery(args.id, args.term))));
            Get("/{id}/appointments/{startDate}/{endDate}", args => Response.AsJson(_bus.Execute<GetAppointmentsQuery, List<AppointmentReadModel>>(new GetAppointmentsQuery(args.id, args.startDate, args.endDate))));
            Get("/{id}/freespots/{date}", args => Response.AsJson(_bus.Execute<GetCalendarFreeSpotsQuery, List<string>>(new GetCalendarFreeSpotsQuery(args.id, args.date))));
            Get("/{id}", args => Response.AsJson(_bus.Execute<GetCalendarQuery, CalendarReadModel>(new GetCalendarQuery(args.id))));
        }
    }
}
