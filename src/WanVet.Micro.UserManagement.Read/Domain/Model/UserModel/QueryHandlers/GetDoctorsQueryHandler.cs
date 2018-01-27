
using NETCore.RedisKit.Core;
using StackExchange.Redis;
using System.Collections.Generic;
using System.Linq;
using WanVet.Infrastructure.Read;
using WanVet.Micro.UserManagement.Read.Domain.Model.UserModel.Queries;

namespace WanVet.Micro.UserManagement.Read.Domain.Model.UserModel.QueryHandlers
{
    public class GetDoctorsQueryHandler : IQueryHandler<GetDoctorsQuery, List<UserReadModel>>
    {
        private readonly IRedisService _redisService;

        public GetDoctorsQueryHandler(IRedisService redisService)
        {
            _redisService = redisService;
        }

        public List<UserReadModel> Handle(GetDoctorsQuery query)
        {
            var users = _redisService.HashGetAll<UserReadModel>("user", CommandFlags.PreferMaster);
            users = users.Where(u => u.Role == "Doctor");
            if (!string.IsNullOrWhiteSpace(query.Term))
            {
                users = users.Where(u => u.FamilyName.ToLower().Contains(query.Term.ToLower()) || 
                                         u.GivenName.ToLower().Contains(query.Term.ToLower()));
            }
            return users.ToList();
        }
    }
}
