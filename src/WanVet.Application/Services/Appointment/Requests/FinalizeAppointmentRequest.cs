using System;

namespace WanVet.Application.Services.Appointment.Requests
{
    public class FinalizeAppointmentRequest
    {
        public Guid AppointmentId { get; set; }

        public string Diagnostic { get; set; }

        public string MedicalHistory { get; set; }
    }
}
