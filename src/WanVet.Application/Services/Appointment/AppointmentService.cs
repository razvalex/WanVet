using MassTransit;
using System;
using System.Collections.Generic;
using System.Text;
using WanVet.Application.Services.Appointment.Requests;
using WanVet.Messaging;
using WanVet.Messaging.Commands;

namespace WanVet.Application.Services.Appointment
{
    public class AppointmentService : IAppointmentService
    {
        private readonly ISendEndpoint _endpoint;

        public AppointmentService(IBusControl busControl)
        {
            _endpoint = busControl.GetSendEndpoint(new Uri($"{RabbitMQConstants.RabbitMQUri}{RabbitMQConstants.AppointmentManagementWriteQueue}")).Result;
        }

        public void Finalize(FinalizeAppointmentRequest request)
        {
            _endpoint.Send<IFinalizeAppointmentCommand>(new
            {
                AppointmentId = request.AppointmentId,
                Diagnostic = request.Diagnostic,
                MedicalHistory = request.MedicalHistory,
                MessageType = (typeof(IFinalizeAppointmentCommand)).Name,
                Timestamp = DateTimeOffset.UtcNow
            }).Wait();
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
