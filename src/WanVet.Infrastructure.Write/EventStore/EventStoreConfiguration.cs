
using System.Net;

namespace WanVet.Infrastructure.Write.EventStore
{
    public static class EventStoreConfiguration
    {
        public static IPAddress Address = IPAddress.Loopback;
        public static int Port = 1113;
    }
}
