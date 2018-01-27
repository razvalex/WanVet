
using System;
using WanVet.Infrastructure.Write.Domain;
using WanVet.Micro.PetManagement.Write.Domain.Model.PetModel.Events;

namespace WanVet.Micro.PetManagement.Write.Domain.Model.PetModel
{
    public class Pet : Aggregate
    {
        public Pet(Guid ownerId, string name, string breed, string sex, string species, string colorHex, DateTime birthDate, string profileImageUrl)
        {
            RaiseEvent(new PetCreatedEvent(ownerId, name, breed, sex, species, colorHex, birthDate, profileImageUrl));
        }

        public override string IdentifierString => "pet";

        public override object Identifier => $"pet-{Id}";

        public Guid Id { get; private set; }

        public Guid OwnerId { get; private set; }

        public string Name { get; private set; }

        public string Breed { get; private set; }

        public string Sex { get; private set; }

        public string Species { get; private set; }

        public string ColorHex { get; private set; }

        public DateTime BirthDate { get; private set; }

        public string ProfileImageUrl { get; private set; }


        public void Apply(PetCreatedEvent @event)
        {
            Id = @event.Id;
            OwnerId = @event.OwnerId;
            Name = @event.Name;
            Breed = @event.Breed;
            Sex = @event.Sex;
            Species = @event.Species;
            ColorHex = @event.ColorHex;
            BirthDate = @event.BirthDate;
            ProfileImageUrl = @event.ProfileImageUrl;
        }
    }
}
