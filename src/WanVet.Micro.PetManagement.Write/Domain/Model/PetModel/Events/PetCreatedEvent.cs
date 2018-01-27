using System;

namespace WanVet.Micro.PetManagement.Write.Domain.Model.PetModel.Events
{
    public class PetCreatedEvent
    {
        public PetCreatedEvent(Guid ownerId, string name, string breed, string sex, string species, string colorHex,
            DateTime birthDate, string profileImageUrl, Guid? id = null)
        {
            Id = id.HasValue ? id.Value : Guid.NewGuid();
            OwnerId = ownerId;
            Name = name;
            Breed = breed;
            Sex = sex;
            Species = species;
            ColorHex = colorHex;
            BirthDate = birthDate;
            ProfileImageUrl = profileImageUrl;
        }

        public Guid Id { get; }

        public Guid OwnerId { get; }

        public string Name { get; }

        public string Breed { get; }

        public string Sex { get; }

        public string Species { get; }

        public string ColorHex { get; }

        public DateTime BirthDate { get; }

        public string ProfileImageUrl { get; }
    }
}
