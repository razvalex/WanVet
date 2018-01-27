using System;
using System.Collections.Generic;
using System.Text;

namespace WanVet.Messaging.Events
{
    public interface IAppointmentDisponibilityConfirmedEvent : IEvent
    {
        Guid PetId { get; set; }

        string PetName { get; set; }

        Guid OwnerId { get; set; }

        string OwnerFamilyName { get; set; }

        string OwnerGivenName { get; set; }

        Guid DoctorId { get; set; }

        DateTimeOffset StartingTime { get; set; }
    }
}
