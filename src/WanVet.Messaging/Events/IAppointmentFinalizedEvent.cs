using System;

namespace WanVet.Messaging.Events
{
    public interface IAppointmentFinalizedEvent : IEvent
    {
        Guid CalendarId { get; set; }

        Guid PetId { get; set; }

        Guid OwnerId { get; set; }

        string State { get; set; }

        Guid DoctorId { get; set; }

        string Diagnostic { get; set; }

        string MedicalHistory { get; set; }
    }
}
