

using System;

namespace WanVet.Messaging.Commands
{
    public interface IFinalizeAppointmentCommand : ICommand
    {
        Guid AppointmentId { get; }

        string Diagnostic { get; }

        string MedicalHistory { get; }
    }
}
