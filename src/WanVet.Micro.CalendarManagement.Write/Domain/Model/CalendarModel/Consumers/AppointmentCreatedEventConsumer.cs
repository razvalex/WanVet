using MassTransit;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using WanVet.Infrastructure.Write.Domain;
using WanVet.Messaging.Events;
using WanVet.Micro.CalendarManagement.Write.Domain.Model.CalendarModel.Events;

namespace WanVet.Micro.CalendarManagement.Write.Domain.Model.CalendarModel.Consumers
{
    public class AppointmentCreatedEventConsumer : IConsumer<IAppointmentCreatedEvent>
    {
        private readonly IRepository _repository;

        public AppointmentCreatedEventConsumer(IRepository repository)
        {
            _repository = repository;
        }

        public async Task Consume(ConsumeContext<IAppointmentCreatedEvent> context)
        {
            var @event = context.Message;
            var calendar = await _repository.GetById<Calendar>(@event.CalendarId);
            calendar.AddAppointment(new AppointmentCreatedEvent(@event.AggregateId, @event.PetId, @event.PetName,
                @event.OwnerId, @event.OwnerFamilyName, @event.OwnerGivenName, @event.StartingTime, @event.State));
            await _repository.SaveAsync(calendar);
        }
    }
}