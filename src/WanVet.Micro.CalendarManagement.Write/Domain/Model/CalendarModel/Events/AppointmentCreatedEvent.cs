using System;
using WanVet.Infrastructure.Write.Domain.ValueObjects;

namespace WanVet.Micro.CalendarManagement.Write.Domain.Model.CalendarModel.Events
{
    public class AppointmentCreatedEvent
    {
        public AppointmentCreatedEvent(Guid id, Guid petId, string petName, Guid ownerId, string ownerFamilyName,
            string ownerGivenName, DateTimeOffset startingTime, string state)
        {
            Id = id;
            PetId = petId;
            PetName = petName;
            OwnerId = ownerId;
            OwnerFamilyName = ownerFamilyName;
            OwnerGivenName = ownerGivenName;
            StartingTime = startingTime;
            State = state;
        }

        public Guid Id { get;  }

        public Guid PetId { get;  }

        public string PetName { get;  }

        public Guid OwnerId { get; }

        public string OwnerFamilyName { get; }

        public string OwnerGivenName { get; }

        public DateTimeOffset StartingTime { get; }

        public string State { get;  }
    }
}
