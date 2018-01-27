using System;
using System.Collections.Generic;
using System.Text;

namespace WanVet.Micro.AppointmentManagement.Write.Domain.Model.AppointmentModel.Events
{
    public class AppointmentFinalizedEvent
    {
        public AppointmentFinalizedEvent(string diagnostic, string medicalHistory)
        {
            Diagnostic = diagnostic;
            MedicalHistory = medicalHistory;
        }

        public string Diagnostic { get; }

        public string MedicalHistory { get; }
    }
}
