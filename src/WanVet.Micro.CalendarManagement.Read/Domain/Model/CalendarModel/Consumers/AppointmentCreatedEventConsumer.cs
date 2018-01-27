using MassTransit;
using NETCore.RedisKit.Core;
using StackExchange.Redis;
using System.Threading.Tasks;
using WanVet.Messaging.Events;

namespace WanVet.Micro.CalendarManagement.Read.Domain.Model.CalendarModel.Consumers
{
    public class AppointmentCreatedEventConsumer : IConsumer<IAppointmentCreatedEvent>
    {
        private readonly IRedisService _redisService;

        public AppointmentCreatedEventConsumer(IRedisService redisService)
        {
            _redisService = redisService;
        }

        public async Task Consume(ConsumeContext<IAppointmentCreatedEvent> context)
        {
            var @event = context.Message;
            var calendar = new CalendarReadModel();
            calendar = _redisService.HashGet<CalendarReadModel>($"{calendar.RedisKey}", $"{@event.CalendarId}", CommandFlags.PreferMaster);
            calendar.Appointments.Add(new AppointmentReadModel
            {
                Id = @event.AggregateId,
                OwnerFamilyName = @event.OwnerFamilyName,
                OwnerGivenName = @event.OwnerGivenName,
                OwnerId = @event.OwnerId,
                PetId = @event.PetId,
                PetName = @event.PetName,
                StartingTime = @event.StartingTime,
                State = @event.State,
            });
            _redisService.HashSet($"{calendar.RedisKey}", $"{@event.CalendarId}", calendar, When.Always, CommandFlags.PreferMaster);
        }
    }
}
