using System;
using System.Collections.Generic;

namespace WanVet.Application.Services.Calendar
{
    public class CalendarViewModel
    {
        public CalendarViewModel()
        {
            Appointments = new List<AppointmentViewModel>();
        }

        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public int Version { get; set; }

        public Dictionary<string, Tuple<int, int>> WorkingHours { get; set; }

        public List<AppointmentViewModel> Appointments { get; set; }
    }

    public class AppointmentViewModel
    {
        public Guid Id { get; set; }

        public Guid PetId { get; set; }

        public string PetName { get; set; }

        public Guid OwnerId { get; set; }

        public string OwnerFamilyName { get; set; }

        public string OwnerGivenName { get; set; }

        public DateTimeOffset StartingTime { get; set; }

        public string State { get; set; }
    }
}
