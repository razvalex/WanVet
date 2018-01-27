using EventStore.ClientAPI;
using MoreLinq;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.ExceptionServices;
using System.Text;
using System.Threading.Tasks;
using WanVet.Infrastructure.Write.Domain.Exceptions;

namespace WanVet.Infrastructure.Write.Domain
{
    public class Repository : IRepository, IDisposable
    {
        private const int _readStreamSize = 500;
        private const int _writeStreamSize = 500;

        private static readonly JsonSerializerSettings SerializerSettings = new JsonSerializerSettings { TypeNameHandling = TypeNameHandling.None };
        private readonly IEventStoreConnection _eventStoreConnection;
        private readonly IEventTypeResolver _eventTypeResolver;

        public Repository(IEventStoreConnection eventStoreConnection, IEventTypeResolver eventTypeResolver)
        {
            _eventStoreConnection = eventStoreConnection;
            _eventTypeResolver = eventTypeResolver;
        }

        public async Task<TAggregate> GetById<TAggregate>(object id) where TAggregate : IAggregate, new()
        {
            var aggregate = new TAggregate();
            var streamName = $"{aggregate.IdentifierString}-{id}";
            var eventNumber = 0L;
            StreamEventsSlice currentSlice;

            do
            {
                currentSlice = await _eventStoreConnection.ReadStreamEventsForwardAsync(streamName, eventNumber, _readStreamSize, false);

                if (currentSlice.Status == SliceReadStatus.StreamNotFound)
                {
                    throw new AggregateNotFoundException(id, typeof(TAggregate));
                }

                if (currentSlice.Status == SliceReadStatus.StreamDeleted)
                {
                    throw new AggregateDeletedException(id, typeof(TAggregate));
                }

                eventNumber = currentSlice.NextEventNumber;

                foreach (var resolvedEvent in currentSlice.Events)
                {
                    var payload = DeserializeEvent(resolvedEvent.Event);
                    aggregate.ApplyEvent(payload);
                }

            } while (!currentSlice.IsEndOfStream);

            return aggregate;
        }

        public async Task<long> SaveAsync(Aggregate aggregate, params KeyValuePair<string, string>[] extraHeaders)
        {
            var streamName = aggregate.Identifier.ToString();
            var uncommittedEvents = aggregate.GetUncommittedEvents();
            var originalVersion = aggregate.Version - uncommittedEvents.Count;

            try
            {
                WriteResult result;

                var commitHeaders = CreateCommitHeaders(aggregate, extraHeaders);
                var eventsToCommit = uncommittedEvents.Select(x => ToEventData(Guid.NewGuid(), x, commitHeaders));

                var eventBatches = GetEventBatches(eventsToCommit);

                if (eventBatches.Count == 1)
                {
                    result = await _eventStoreConnection.AppendToStreamAsync(streamName, originalVersion, eventBatches[0]);
                }
                else
                {                 
                    using (var transaction = await _eventStoreConnection.StartTransactionAsync(streamName, originalVersion))
                    {
                        foreach (var batch in eventBatches)
                        {
                            await transaction.WriteAsync(batch);
                        }
                        result = await transaction.CommitAsync();
                    }
                }

                aggregate.ClearUncommittedEvents();
                return result.NextExpectedVersion;
            }
            catch (Exception ex)
            {
                ExceptionDispatchInfo.Capture(ex).Throw();
            }

            return originalVersion + 1;
        }

        private object DeserializeEvent(RecordedEvent evt)
        {
            var targetType = _eventTypeResolver.GetTypeForEventName(evt.EventType);
            var json = Encoding.UTF8.GetString(evt.Data);
            return JsonConvert.DeserializeObject(json, targetType);
        }

        private IList<IList<EventData>> GetEventBatches(IEnumerable<EventData> events)
        {
            return events.Batch(_writeStreamSize).Select(x => (IList<EventData>)x.ToList()).ToList();
        }

        private static IDictionary<string, string> CreateCommitHeaders(Aggregate aggregate, KeyValuePair<string, string>[] extraHeaders)
        {
            var commitId = Guid.NewGuid();

            var commitHeaders = new Dictionary<string, string>
            {
                {MetadataKeys.CommitIdHeader, commitId.ToString()},
                {MetadataKeys.AggregateClrTypeHeader, aggregate.GetType().AssemblyQualifiedName},
                {MetadataKeys.ServerClockHeader, DateTime.UtcNow.ToString("o")}
            };

            foreach (var extraHeader in extraHeaders)
            {
                commitHeaders[extraHeader.Key] = extraHeader.Value;
            }

            return commitHeaders;
        }

        private static EventData ToEventData(Guid eventId, object evnt, IDictionary<string, string> headers)
        {
            var data = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(evnt, SerializerSettings));
            var eventHeaders = new Dictionary<string, string>(headers)
            {
                {MetadataKeys.EventClrTypeHeader, evnt.GetType().AssemblyQualifiedName}
            };
            var metadata = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(eventHeaders, SerializerSettings));
            var typeName = evnt.GetType().Name;
            return new EventData(eventId, typeName, true, data, metadata);
        }

        public void Dispose()
        {
        }
    }
}
