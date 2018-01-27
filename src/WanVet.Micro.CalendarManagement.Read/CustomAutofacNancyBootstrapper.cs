using Autofac;
using Nancy;
using Nancy.Bootstrappers.Autofac;
using Nancy.Configuration;

namespace WanVet.Micro.CalendarManagement.Read
{
    public class CustomAutofacNancyBootstrapper : AutofacNancyBootstrapper
    {
        protected override ILifetimeScope GetApplicationContainer()
        {
            return IoCConfig.Container;
        }

        public override void Configure(INancyEnvironment environment)
        {
            environment.Tracing(true, true);
        }
    }
}