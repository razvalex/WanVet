
using System;
using System.Collections.Generic;

namespace WanVet.Application.Services.Pet
{
    public class PetViewModel
    {
        public PetViewModel()
        {
            Appointments = new List<AppointmentViewModel>();
        }

        public string Id { get; set; }

        public string Name { get; set; }

        public string Breed { get; set; }

        public string Sex { get; set; }

        public string Species { get; set; }

        public string ColorHex { get; set; }

        public DateTime BirthDate { get; set; }

        public string ProfileImageUrl { get; set; }

        public string OwnerId { get; set; }

        public List<AppointmentViewModel> Appointments { get; set; }
    }

    public class AppointmentViewModel
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
