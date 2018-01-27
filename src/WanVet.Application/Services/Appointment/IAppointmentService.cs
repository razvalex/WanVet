using System;
using WanVet.Application.Services.Appointment.Requests;

namespace WanVet.Application.Services.Appointment
{
    public interface IAppointmentService : IDisposable
    {
        void Finalize(FinalizeAppointmentRequest request);
    }
}
