using System;

namespace WanVet.Application.Services.Calendar.Requests
{
    public class CheckAppointmentDisponibilityRequest
    {
        public Guid CalendarId { get; set; }

        public Guid PetId { get; set; }

        public string PetName { get; set; }

        public Guid OwnerId { get; set; }

        public string OwnerFamilyName { get; set; }

        public string OwnerGivenName { get; set; }

        public string Date { get; set; }

        public string Time { get; set; }
    }
}
