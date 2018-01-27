using MassTransit;
using NETCore.RedisKit.Core;
using StackExchange.Redis;
using System.Threading.Tasks;
using WanVet.Messaging.Events;

namespace WanVet.Micro.UserManagement.Read.Domain.Model.UserModel.Consumers
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
            var user = new UserReadModel();
            user = _redisService.HashGet<UserReadModel>($"{user.RedisKey}", $"{@event.UserEmail}", CommandFlags.PreferMaster);
            user.CalendarId = @event.AggregateId;
            _redisService.HashSet($"{user.RedisKey}", $"{@event.UserEmail}", user, When.Always, CommandFlags.PreferMaster);
        }
    }
}
