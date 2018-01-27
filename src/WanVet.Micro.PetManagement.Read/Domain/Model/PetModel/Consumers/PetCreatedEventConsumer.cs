using MassTransit;
using NETCore.RedisKit.Core;
using StackExchange.Redis;
using System;
using System.Threading.Tasks;
using WanVet.Messaging.Events;

namespace WanVet.Micro.PetManagement.Read.Domain.Model.PetModel.Consumers
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

            var pet = new PetReadModel
            {
                Id = @event.AggregateId,
                OwnerId = @event.OwnerId,
                BirthDate = @event.BirthDate,
                Breed = @event.Breed,
                ColorHex = @event.ColorHex,
                Name = @event.Name,
                ProfileImageUrl = @event.ProfileImageUrl,
                Sex = @event.Sex,
                Species = @event.Species,
                Version = @event.Version
            };
            _redisService.HashSet($"{pet.RedisKey}", $"{pet.Id}", pet, When.Always, CommandFlags.PreferMaster);
        }
    }
}
