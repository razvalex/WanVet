

using Refit;
using System;
using System.Threading.Tasks;

namespace WanVet.Application.Services.Pet
{
    public interface IPetApi
    {
        [Get("/{id}")]
        Task<PetViewModel> Get(Guid id);
    }
}
