using System;
using WanVet.Infrastructure.Read;

namespace WanVet.Micro.PetManagement.Read.Domain.Model.PetModel.Queries
{
    public class GetPetQuery : IQuery<PetReadModel>
    {
        public GetPetQuery(Guid id)
        {
            Id = id;
        }

        public Guid Id { get; private set; }
    }
}
