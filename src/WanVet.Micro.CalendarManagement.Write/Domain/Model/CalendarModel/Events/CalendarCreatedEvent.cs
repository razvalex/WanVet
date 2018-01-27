
using System;

namespace WanVet.Micro.CalendarManagement.Write.Domain.Model.CalendarModel.Events
{
    public class CalendarCreatedEvent
    {
        public CalendarCreatedEvent(Guid userId, Guid? id = null)
        {
            Id = id.HasValue ? id.Value : Guid.NewGuid();
            UserId = userId;
        }

        public Guid Id { get; }

        public Guid UserId { get; }
    }
}
