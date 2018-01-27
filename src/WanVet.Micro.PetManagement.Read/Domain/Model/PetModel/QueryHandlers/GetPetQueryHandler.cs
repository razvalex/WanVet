
using NETCore.RedisKit.Core;
using StackExchange.Redis;
using System.Linq;
using WanVet.Infrastructure.Read;
using WanVet.Micro.PetManagement.Read.Domain.Model.PetModel.Queries;

namespace WanVet.Micro.PetManagement.Read.Domain.Model.PetModel.QueryHandlers
{
    public class GetPetQueryHandler : IQueryHandler<GetPetQuery, PetReadModel>
    {
        private readonly IRedisService _redisService;

        public GetPetQueryHandler(IRedisService redisService)
        {
            _redisService = redisService;
        }

        public PetReadModel Handle(GetPetQuery query)
        {
            var pet = new PetReadModel();
            pet = _redisService.HashGet<PetReadModel>($"{pet.RedisKey}", $"{query.Id}", CommandFlags.PreferMaster);
            pet.Appointments = pet.Appointments.OrderBy(x => x.StartingTime).ToList();
            return pet;
        }
    }
}
