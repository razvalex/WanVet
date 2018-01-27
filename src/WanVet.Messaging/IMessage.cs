
using System;

namespace WanVet.Messaging
{
    public interface IMessage
    {
        string MessageType { get; set; }

        Guid AggregateId { get; set; }

        DateTimeOffset Timestamp { get; set; }
    }
}
