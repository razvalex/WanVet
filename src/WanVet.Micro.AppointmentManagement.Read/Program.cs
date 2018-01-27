using Autofac;
using DasMulli.Win32.ServiceUtils;
using System;
using System.Diagnostics;
using System.Linq;
using System.Text.RegularExpressions;

namespace WanVet.Micro.AppointmentManagement.Read
{
    public class Program
    {
        private const string RunAsServiceFlag = "--run-as-service";
        private const string RegisterServiceFlag = "--register-service";
        private const string UnregisterServiceFlag = "--unregister-service";
        private const string InteractiveFlag = "--interactive";

        private const string ServiceName = "WanVet.Micro.AppointmentManagement.Read";
        private const string ServiceDisplayName = "WanVet.Micro.AppointmentManagement.Read";
        private const string ServiceDescription = "WanVet.Micro.AppointmentManagement.Read";

        public static void Main(string[] args)
        {
            try
            {
                if (Debugger.IsAttached)
                {
                    RunInteractive(args);
                }
                else if (args.Contains(RunAsServiceFlag))
                {
                    RunAsService(args);
                }
                else if (args.Contains(RegisterServiceFlag))
                {
                    RegisterService();
                }
                else if (args.Contains(UnregisterServiceFlag))
                {
                    UnregisterService();
                }
                else if (args.Contains(InteractiveFlag))
                {
                    RunInteractive(args);
                }
                else
                {
                    DisplayDescription();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error ocurred: {ex.Message}");
            }
        }

        private static void RunAsService(string[] args)
        {
            var win32Service = new Win32Service(args.Where(a => a != RunAsServiceFlag).ToArray());
            var serviceHost = new Win32ServiceHost(win32Service);
            serviceHost.Run();
        }

        private static void RunInteractive(string[] args)
        {
            var win32Service = new Win32Service(args.Where(a => a != InteractiveFlag).ToArray());
            win32Service.Start(new string[0], () => { });
            Console.WriteLine(win32Service.ServiceName);
            Console.WriteLine("Running interactively, press enter to stop.");
            Console.ReadLine();
            win32Service.Stop();
        }

        private static void RegisterService()
        {
            var remainingArgs = Environment.GetCommandLineArgs()
                .Where(arg => arg != RegisterServiceFlag)
                .Select(EscapeCommandLineArgument)
                .Append(RunAsServiceFlag);

            var host = Process.GetCurrentProcess().MainModule.FileName;

            if (!host.EndsWith("dotnet.exe", StringComparison.OrdinalIgnoreCase))
            {
                remainingArgs = remainingArgs.Skip(1);
            }

            var fullServiceCommand = host + " " + string.Join(" ", remainingArgs);

            new Win32ServiceManager()
                .CreateService(
                    ServiceName,
                    ServiceDisplayName,
                    ServiceDescription,
                    fullServiceCommand,
                    Win32ServiceCredentials.LocalSystem,
                    autoStart: true,
                    startImmediately: true,
                    errorSeverity: ErrorSeverity.Normal
                );

            Console.WriteLine($@"Successfully registered and started service ""{ServiceDisplayName}"" (""{ServiceDescription}"")");
        }

        private static void UnregisterService()
        {
            new Win32ServiceManager()
                .DeleteService(ServiceName);

            Console.WriteLine($@"Successfully unregistered service ""{ServiceDisplayName}"" (""{ServiceDescription}"")");
        }

        private static void DisplayDescription()
        {
            Console.WriteLine(ServiceDescription);
        }

        private static string EscapeCommandLineArgument(string arg)
        {
            // http://stackoverflow.com/a/6040946/784387
            arg = Regex.Replace(arg, @"(\\*)" + "\"", @"$1$1\" + "\"");
            arg = "\"" + Regex.Replace(arg, @"(\\+)$", @"$1$1") + "\"";
            return arg;
        }
    }
}