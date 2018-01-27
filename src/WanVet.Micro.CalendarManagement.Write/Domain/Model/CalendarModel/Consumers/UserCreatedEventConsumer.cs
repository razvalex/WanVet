using MassTransit;
using System;
using System.Threading.Tasks;
using WanVet.Infrastructure.Write.Domain;
using WanVet.Infrastructure.Write.Domain.ValueObjects;
using WanVet.Messaging.Events;

namespace WanVet.Micro.CalendarManagement.Write.Domain.Model.CalendarModel.Consumers
{
    public class UserCreatedEventConsumer : IConsumer<IUserCreatedEvent>
    {
        private readonly IRepository _repository;

        public UserCreatedEventConsumer(IRepository repository)
        {
            _repository = repository;
        }

        public async Task Consume(ConsumeContext<IUserCreatedEvent> context)
        {
            var @event = context.Message;
            var role = new Role(@event.Role);
            var doctorRole = new DoctorRole();
            if (role.Equals(doctorRole))
            {
                var calendar = new Calendar(@event.AggregateId);
                await _repository.SaveAsync(calendar);
                await context.Publish<ICalendarCreatedEvent>(new
                {
                    Version = calendar.Version,
                    Timestamp = DateTimeOffset.UtcNow,
                    MessageType = typeof(ICalendarCreatedEvent).Name,
                    AggregateId = calendar.Id,
                    WorkingHours = calendar.WorkingHours,
                    UserId = calendar.UserId,
                    UserEmail = @event.Email
                });
            }
        }
    }
}
