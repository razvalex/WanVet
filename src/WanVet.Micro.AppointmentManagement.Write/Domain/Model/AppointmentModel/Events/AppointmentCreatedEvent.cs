using System;
using WanVet.Infrastructure.Write.Domain.ValueObjects;

namespace WanVet.Micro.AppointmentManagement.Write.Domain.Model.AppointmentModel.Events
{
    public class AppointmentCreatedEvent
    {
        public AppointmentCreatedEvent(Guid calendarId, Guid petId, string petName, Guid ownerId, string ownerFamilyName,
            string ownerGivenName, Guid doctorId, DateTimeOffset startingTime, Guid? id = null)
        {
            Id = id.HasValue ? id.Value : Guid.NewGuid();
            CalendarId = calendarId;
            PetId = petId;
            PetName = petName;
            OwnerId = ownerId;
            OwnerFamilyName = ownerFamilyName;
            OwnerGivenName = ownerGivenName;
            DoctorId = doctorId;
            StartingTime = startingTime;
            State = new Open();
        }

        public Guid Id { get; }

        public Guid CalendarId { get; }

        public Guid PetId { get; }

        public string PetName { get;  }

        public Guid OwnerId { get; }

        public  string OwnerFamilyName { get;  }

        public string OwnerGivenName { get; }

        public Guid DoctorId { get; }

        public DateTimeOffset StartingTime { get; }

        public AppointmentState State { get; }
    }
}
