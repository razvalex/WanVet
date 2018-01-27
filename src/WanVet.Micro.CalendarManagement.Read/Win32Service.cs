using System;
using DasMulli.Win32.ServiceUtils;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;


namespace WanVet.Micro.CalendarManagement.Read
{
    internal class Win32Service : IWin32Service
    {
        private readonly string[] _commandLineArguments;
        private IWebHost _webHost;
        private bool _stopRequestedByWindows;

        public Win32Service(string[] commandLineArguments)
        {
            _commandLineArguments = commandLineArguments;
        }

        public string ServiceName => "WanVet.Micro.CalendarManagement.Read";

        public void Start(string[] startupArguments, ServiceStoppedCallback serviceStoppedCallback)
        {
            string[] combinedArguments;
            if (startupArguments.Length > 0)
            {
                combinedArguments = new string[_commandLineArguments.Length + startupArguments.Length];
                Array.Copy(_commandLineArguments, combinedArguments, _commandLineArguments.Length);
                Array.Copy(startupArguments, 0, combinedArguments, _commandLineArguments.Length, startupArguments.Length);
            }
            else
            {
                combinedArguments = _commandLineArguments;
            }

            var config = new ConfigurationBuilder()
                .AddCommandLine(combinedArguments)
                .Build();

            _webHost = new WebHostBuilder()
                .UseUrls("http://*:5088")
                .UseKestrel()
                .UseStartup<Startup>()
                .UseConfiguration(config)
                .Build();

            _webHost
                .Services
                .GetRequiredService<IApplicationLifetime>()
                .ApplicationStopped
                .Register(() =>
                {
                    if (_stopRequestedByWindows == false)
                    {
                        serviceStoppedCallback();
                    }
                });

            _webHost.Start();
        }

        public void Stop()
        {
            _stopRequestedByWindows = true;
            _webHost.Dispose();
        }
    }
}
