using System;

namespace WanVet.Messaging.Events
{
    public interface IAppointmentCreatedEvent : IEvent
    {
        Guid CalendarId { get; set; }

        Guid PetId { get; set; }

        string PetName { get; set; }

        Guid OwnerId { get; set; }

        string OwnerFamilyName { get; set; }

        string OwnerGivenName { get; set; }

        Guid DoctorId { get; set; }

        DateTimeOffset StartingTime { get; set; }

        string State { get; set; }
    }
}
