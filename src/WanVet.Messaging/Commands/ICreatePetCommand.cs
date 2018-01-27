

using System;

namespace WanVet.Messaging.Commands
{
    public interface ICreatePetCommand : ICommand
    {
        Guid OwnerId { get; set; }

        string OwnerEmail { get; set; }

        string Name { get; set; }

        string Breed { get; set; }

        string Sex { get; set; }

        string Species { get; set; }

        string ColorHex { get; set; }

        DateTime BirthDate { get; set; }

        string ProfileImageUrl { get; set; }
    }
}
