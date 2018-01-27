using System;
using System.Collections.Generic;
using WanVet.Infrastructure.Read;

namespace WanVet.Micro.CalendarManagement.Read.Domain.Model.CalendarModel
{
    public class CalendarReadModel : IRedisReadModel
    {
        public CalendarReadModel()
        {
            Appointments = new List<AppointmentReadModel>();
        }

        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public int Version { get; set; }

        public Dictionary<string, Tuple<int, int>> WorkingHours { get; set; }

        public List<AppointmentReadModel> Appointments { get; set; }

        public string RedisKey => "calendar";
    }

    public class AppointmentReadModel
    {
        public Guid Id { get; set; }

        public Guid PetId { get; set; }

        public string PetName { get; set; }

        public Guid OwnerId { get; set; }

        public string OwnerFamilyName { get; set; }

        public string OwnerGivenName { get; set; }

        public DateTimeOffset StartingTime { get; set; }

        public string State { get; set; }

        public string Diagnostic { get; set; }

        public string MedicalHistory { get; set; }
    }
}
