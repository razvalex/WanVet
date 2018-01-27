using System;
using WanVet.Application.Services.Pet.Requests;

namespace WanVet.Application.Services.Pet
{
    public interface IPetService : IDisposable
    {
        void Create(CreatePetRequest request);

        PetViewModel Get(Guid id);
    }
}
