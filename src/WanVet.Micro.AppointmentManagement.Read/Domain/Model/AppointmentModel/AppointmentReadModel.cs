using System;
using WanVet.Infrastructure.Read;

namespace WanVet.Micro.AppointmentManagement.Read.Domain.Model.AppointmentModel
{
    public class AppointmentReadModel : IRedisReadModel
    {
        public Guid Id { get; set; }

        public Guid CalendarId { get; set; }

        public Guid PetId { get; set; }

        public string PetName { get; set; }

        public Guid OwnerId { get; set; }

        public string OwnerFamilyName { get; set; }

        public string OwnerGivenName { get; set; }

        public Guid DoctorId { get; set; }

        public DateTimeOffset StartingTime { get; set; }

        public string State { get; set; }

        public string Diagnostic { get; set; }

        public string MedicalHistory { get; set; }

        public int Version { get; set; }

        public string RedisKey => "appointment";

    }
}
