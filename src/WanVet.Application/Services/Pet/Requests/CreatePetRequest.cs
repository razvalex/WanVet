
using System;

namespace WanVet.Application.Services.Pet.Requests
{
    public class CreatePetRequest
    {
        public Guid OwnerId { get; set; }

        public string OwnerEmail { get; set; }

        public string Name { get; set; }

        public string Breed { get; set; }

        public string Sex { get; set; }

        public string Species { get; set; }

        public string ColorHex { get; set; }

        public DateTime BirthDate { get; set; }

        public string ProfileImageUrl { get; set; }
    }
}
