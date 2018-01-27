using MassTransit;
using System;
using System.Threading.Tasks;
using WanVet.Infrastructure.Write.Domain;
using WanVet.Messaging.Commands;
using WanVet.Messaging.Events;

namespace WanVet.Micro.PetManagement.Write.Domain.Model.PetModel.Consumers
{
    public class CreatePetCommandConsumer : IConsumer<ICreatePetCommand>
    {
        private readonly IRepository _repository;

        public CreatePetCommandConsumer(IRepository repository)
        {
            _repository = repository;
        }

        public async Task Consume(ConsumeContext<ICreatePetCommand> context)
        {
            var command = context.Message;
            var pet = new Pet(command.OwnerId, command.Name, command.Breed, command.Sex, command.Species, command.ColorHex, command.BirthDate, command.ProfileImageUrl);
            await _repository.SaveAsync(pet);
            await context.Publish<IPetCreatedEvent>(new
            {
                Version = pet.Version,
                Timestamp = DateTimeOffset.UtcNow,
                MessageType = typeof(IPetCreatedEvent).Name,
                AggregateId = pet.Id,
                OwnerId = pet.OwnerId,
                OwnerEmail = command.OwnerEmail,
                BirthDate = command.BirthDate,
                Name = pet.Name, 
                Breed = pet.Breed,
                Sex = pet.Sex,
                ColorHex = pet.ColorHex,
                Species = pet.Species,
                ProfileImageUrl = pet.ProfileImageUrl               
            });
        }
    }
}
