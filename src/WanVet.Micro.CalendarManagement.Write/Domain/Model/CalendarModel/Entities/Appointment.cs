using System;
using WanVet.Infrastructure.Write.Domain.ValueObjects;

namespace WanVet.Micro.CalendarManagement.Write.Domain.Model.CalendarModel.Entities
{
    public class Appointment
    {
        public Guid Id { get; set; }

        public Guid PetId { get; set; }

        public string PetName { get; set; }

        public Guid OwnerId { get; set; }

        public string OwnerFamilyName { get; set; }

        public string OwnerGivenName { get; set; }

        public DateTimeOffset StartingTime { get; set; }

        public AppointmentState State { get; set; }
    }
}
