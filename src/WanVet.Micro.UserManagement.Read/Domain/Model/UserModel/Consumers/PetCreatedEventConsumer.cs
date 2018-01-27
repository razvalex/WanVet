using MassTransit;
using NETCore.RedisKit.Core;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WanVet.Messaging.Events;

namespace WanVet.Micro.UserManagement.Read.Domain.Model.UserModel.Consumers
{
    public class PetCreatedEventConsumer : IConsumer<IPetCreatedEvent>
    {
        private readonly IRedisService _redisService;

        public PetCreatedEventConsumer(IRedisService redisService)
        {
            _redisService = redisService;
        }

        public async Task Consume(ConsumeContext<IPetCreatedEvent> context)
        {
            var @event = context.Message;

            var user = new UserReadModel();
            user = _redisService.HashGet<UserReadModel>($"{user.RedisKey}", $"{@event.OwnerEmail}", CommandFlags.PreferMaster);
            user.Pets.Add(new PetReadModel
            {
                Id = @event.AggregateId,
                Breed = @event.Breed,
                Name = @event.Name,
                ProfileImageUrl = @event.ProfileImageUrl,
                Sex = @event.Sex,
                Species = @event.Species
            });

            _redisService.HashSet($"{user.RedisKey}", $"{@event.OwnerEmail}", user, When.Always, CommandFlags.PreferMaster);
        }
    }
}
