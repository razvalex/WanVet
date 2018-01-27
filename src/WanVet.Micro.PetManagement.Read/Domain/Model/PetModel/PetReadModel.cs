
using System;
using System.Collections.Generic;
using WanVet.Infrastructure.Read;

namespace WanVet.Micro.PetManagement.Read.Domain.Model.PetModel
{
    public class PetReadModel : IRedisReadModel
    {
        public PetReadModel()
        {
            Appointments = new List<AppointmentReadModel>();
        }

        public Guid Id { get; set; }

        public Guid OwnerId { get; set; }

        public int Version { get; set; }

        public string Name { get; set; }

        public string Breed { get; set; }

        public string Sex { get; set; }

        public string Species { get; set; }

        public string ColorHex { get; set; }

        public DateTime BirthDate { get; set; }

        public string ProfileImageUrl { get; set; }

        public List<AppointmentReadModel> Appointments { get; set; }

        public string RedisKey => "pet";
    }

    public class AppointmentReadModel
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
    }
}
