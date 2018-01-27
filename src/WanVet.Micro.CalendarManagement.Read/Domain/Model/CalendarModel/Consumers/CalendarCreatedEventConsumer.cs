using MassTransit;
using NETCore.RedisKit.Core;
using StackExchange.Redis;
using System.Threading.Tasks;
using WanVet.Messaging.Events;

namespace WanVet.Micro.CalendarManagement.Read.Domain.Model.CalendarModel.Consumers
{
    public class CalendarCreatedEventConsumer : IConsumer<ICalendarCreatedEvent>
    {
        private readonly IRedisService _redisService;

        public CalendarCreatedEventConsumer(IRedisService redisService)
        {
            _redisService = redisService;
        }

        public async Task Consume(ConsumeContext<ICalendarCreatedEvent> context)
        {
            var @event = context.Message;
            var calendar = new CalendarReadModel
            {
                Id = @event.AggregateId,
                UserId = @event.UserId,
                WorkingHours = @event.WorkingHours,
                Version = @event.Version
            };
            _redisService.HashSet($"{calendar.RedisKey}", $"{calendar.Id}", calendar, When.Always, CommandFlags.PreferMaster);
        }
    }
}
