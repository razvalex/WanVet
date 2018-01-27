using Autofac;
using Autofac.Extensions.DependencyInjection;
using EventStore.ClientAPI;
using MassTransit;
using MassTransit.AutofacIntegration;
using MassTransit.RabbitMqTransport;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Reflection;
using WanVet.Infrastructure.Write.Domain;
using WanVet.Infrastructure.Write.EventStore;
using WanVet.Messaging;
using WanVet.Micro.PetManagement.Write.Domain.Model.PetModel.Consumers;


namespace WanVet.Micro.PetManagement.Write
{
    internal class Startup
    {
        public void Configure(IApplicationBuilder app)
        {
            app.Run(async (context) =>
            {
                await context.Response.WriteAsync("WanVet.Micro.PetManagement.Write");
            });
        }

        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            var containerBuilder = new ContainerBuilder();
            containerBuilder.RegisterModule<DefaultModule>();
            containerBuilder.Populate(services);
            return new AutofacServiceProvider(containerBuilder.Build());
        }

        public class DefaultModule : Autofac.Module
        {
            protected override void Load(ContainerBuilder containerBuilder)
            {
                containerBuilder.Register(c => new EventTypeResolver(typeof(DefaultModule).GetTypeInfo().Assembly)).As<IEventTypeResolver>();
                containerBuilder.Register(c => EventStoreConnectionFactory.Create())
                                .As<IEventStoreConnection>();
                containerBuilder.RegisterType<Repository>().As<IRepository>();
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
            }

            private void ConfigureEndPoints(IRabbitMqBusFactoryConfigurator cfg, IRabbitMqHost host, IComponentContext context)
            {
                cfg.ReceiveEndpoint(host, RabbitMQConstants.PetManagementWriteQueue, e =>
                {
                    e.Consumer(context.Resolve<IConsumerFactory<CreatePetCommandConsumer>>());
                });
            }
        }
    }
}
