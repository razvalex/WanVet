
using System;
using System.Collections.Generic;

namespace WanVet.Messaging.Events
{
    public interface ICalendarCreatedEvent : IEvent
    {
        Guid UserId { get; set; }

        string UserEmail { get; set; }

        Dictionary<string, Tuple<int, int>> WorkingHours { get; set; }
    }
}
