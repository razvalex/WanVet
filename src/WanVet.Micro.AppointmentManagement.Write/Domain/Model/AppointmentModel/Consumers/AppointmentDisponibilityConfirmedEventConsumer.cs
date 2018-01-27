using MassTransit;
using System;
using System.Threading.Tasks;
using WanVet.Infrastructure.Write.Domain;
using WanVet.Messaging.Events;

namespace WanVet.Micro.AppointmentManagement.Write.Domain.Model.AppointmentModel.Consumers
{
    public class AppointmentDisponibilityConfirmedEventConsumer : IConsumer<IAppointmentDisponibilityConfirmedEvent>
    {
        private readonly IRepository _repository;

        public AppointmentDisponibilityConfirmedEventConsumer(IRepository repository)
        {
            _repository = repository;
        }

        public async Task Consume(ConsumeContext<IAppointmentDisponibilityConfirmedEvent> context)
        {
            var @event = context.Message;
            var appointment = new Appointment(@event.AggregateId, @event.PetId, @event.PetName, @event.OwnerId, 
                            @event.OwnerFamilyName, @event.OwnerGivenName, @event.DoctorId, @event.StartingTime);
            await _repository.SaveAsync(appointment);
            await context.Publish<IAppointmentCreatedEvent>(new
            {
                Version = appointment.Version,
                Timestamp = DateTimeOffset.UtcNow,
                MessageType = typeof(IAppointmentCreatedEvent).Name,
                AggregateId = appointment.Id,
                CalendarId = appointment.CalendarId,
                State = appointment.State.Name,
                StartingTime = appointment.StartingTime,
                PetId = appointment.PetId,
                PetName = appointment.PetName,
                OwnerId = appointment.OwnerId,
                OwnerFamilyName = appointment.OwnerFamilyName,
                OwnerGivenName = appointment.OwnerGivenName,
                DoctorId = appointment.DoctorId
            });
        }
    }
}
