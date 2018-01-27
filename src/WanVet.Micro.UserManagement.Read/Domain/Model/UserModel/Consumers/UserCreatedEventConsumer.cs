using MassTransit;
using NETCore.RedisKit.Core;
using StackExchange.Redis;
using System;
using System.Threading.Tasks;
using WanVet.Messaging.Events;

namespace WanVet.Micro.UserManagement.Read.Domain.Model.UserModel.Consumers
{
    public class UserCreatedEventConsumer : IConsumer<IUserCreatedEvent>
    {
        private readonly IRedisService _redisService;

        public UserCreatedEventConsumer(IRedisService redisService)
        {
            _redisService = redisService;
        }

        public async Task Consume(ConsumeContext<IUserCreatedEvent> context)
        {
            var @event = context.Message;

            var user = new UserReadModel
            {
                Id = @event.AggregateId,
                Version = @event.Version,
                Email = @event.Email,
                FamilyName = @event.FamilyName,
                GivenName = @event.GivenName,
                PhoneNumber = @event.PhoneNumber,
                Gender = @event.Gender,
                Role = @event.Role
            };

            _redisService.HashSet($"{user.RedisKey}", $"{user.Email}", user, When.Always, CommandFlags.PreferMaster);
        }
    }
}
