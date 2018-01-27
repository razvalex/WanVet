using MassTransit;
using System;
using System.Threading.Tasks;
using WanVet.Infrastructure.Write.Domain;
using WanVet.Messaging.Commands;
using WanVet.Messaging.Events;

namespace WanVet.Micro.AppointmentManagement.Write.Domain.Model.AppointmentModel.Consumers
{
    public class FinalizeAppointmentCommandConsumer : IConsumer<IFinalizeAppointmentCommand>
    {
        private readonly IRepository _repository;

        public FinalizeAppointmentCommandConsumer(IRepository repository)
        {
            _repository = repository;
        }

        public async Task Consume(ConsumeContext<IFinalizeAppointmentCommand> context)
        {
            var command = context.Message;
            var appointment = await _repository.GetById<Appointment>(command.AppointmentId);
            appointment.Finalize(command.Diagnostic, command.MedicalHistory);
            await _repository.SaveAsync(appointment);
            await context.Publish<IAppointmentFinalizedEvent>(new
            {
                Version = appointment.Version,
                Timestamp = DateTimeOffset.UtcNow,
                MessageType = typeof(IAppointmentFinalizedEvent).Name,
                AggregateId = appointment.Id,
                PetId = appointment.PetId,
                OwnerId = appointment.OwnerId,
                DoctorId = appointment.DoctorId,
                CalendarId = appointment.CalendarId,
                State = appointment.State.Name,
                MedicalHistory = appointment.MedicalHistory,
                Diagnostic = appointment.Diagnostic
            });
        }
    }
}
