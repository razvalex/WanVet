using Autofac;
using Autofac.Extensions.DependencyInjection;
using MassTransit;
using MassTransit.AutofacIntegration;
using MassTransit.RabbitMqTransport;
using Microsoft.Extensions.DependencyInjection;
using NETCore.RedisKit.Extensions;
using NETCore.RedisKit.Infrastructure.Internal;
using System;
using System.Reflection;
using WanVet.Infrastructure.Read;
using WanVet.Messaging;
using WanVet.Micro.CalendarManagement.Read.Domain.Model.CalendarModel.Consumers;

namespace WanVet.Micro.CalendarManagement.Read
{
    public static class IoCConfig
    {
        public static IContainer Container { get; private set; }

        public static void BuildContainer(IServiceCollection services)
        {
            var containerBuilder = new ContainerBuilder();
            containerBuilder.Populate(services.AddRedisKit(optionsBuilder =>
            {
                optionsBuilder.UseRedis(
                  options: new RedisKitOptions
                  {
                      EndPoints = "127.0.0.1:6379"
                  },
                  isShowLog: true);
            }));
            containerBuilder.RegisterModule<DefaultModule>();
            Container = containerBuilder.Build();
        }
    }

    public class DefaultModule : Autofac.Module
    {
        protected override void Load(ContainerBuilder containerBuilder)
        {
            containerBuilder.RegisterConsumers(Assembly.GetEntryAssembly());
            containerBuilder.RegisterGeneric(typeof(AutofacConsumerFactory<>))
                         .WithParameter(new NamedParameter("name", "message"))
                         .As(typeof(IConsumerFactory<>))
                         .InstancePerLifetimeScope();
            containerBuilder.Register((c) =>
            {
                var busControl = BusConfigurator.Instance.ConfigureBus((cfg, host) =>
                {
                    ConfigureEndPoints(cfg, host, c);
                });
                busControl.Start();
                return busControl;
            }).SingleInstance().AutoActivate();

            containerBuilder.RegisterAssemblyTypes(typeof(DefaultModule).GetTypeInfo().Assembly)
               .Where(x => x.IsAssignableTo<IQueryHandler>())
               .AsImplementedInterfaces();

            containerBuilder.Register<Func<Type, Type, IQueryHandler>>(c =>
            {
                var ctx = c.Resolve<IComponentContext>();

                return (t, t2) =>
                {
                    var handlerType = typeof(IQueryHandler<,>).MakeGenericType(t, t2);
                    return (IQueryHandler)ctx.Resolve(handlerType);
                };
            });

            containerBuilder.RegisterType<QueryBus>()
                .AsImplementedInterfaces();
        }

        private void ConfigureEndPoints(IRabbitMqBusFactoryConfigurator cfg, IRabbitMqHost host, IComponentContext context)
        {
            cfg.ReceiveEndpoint(host, RabbitMQConstants.CalendarManagementReadQueue, e =>
            {
                e.Consumer(context.Resolve<IConsumerFactory<CalendarCreatedEventConsumer>>());      
                e.Consumer(context.Resolve<IConsumerFactory<AppointmentCreatedEventConsumer>>());
                e.Consumer(context.Resolve<IConsumerFactory<AppointmentFinalizedEventConsumer>>());              
            });
        }
    }
}
