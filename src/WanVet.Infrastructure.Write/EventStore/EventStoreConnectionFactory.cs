using EventStore.ClientAPI;
using System.Net;

namespace WanVet.Infrastructure.Write.EventStore
{
    public class EventStoreConnectionFactory
    {
        public static IEventStoreConnection Create()
        {
            var eventStoreConnection = EventStoreConnection.Create(new IPEndPoint(EventStoreConfiguration.Address, EventStoreConfiguration.Port));
            eventStoreConnection.ConnectAsync().Wait();
            return eventStoreConnection;
        }
    }
}
