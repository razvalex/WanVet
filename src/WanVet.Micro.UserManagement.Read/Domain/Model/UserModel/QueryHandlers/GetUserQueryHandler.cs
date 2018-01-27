using NETCore.RedisKit.Core;
using StackExchange.Redis;
using System.Linq;
using WanVet.Infrastructure.Read;
using WanVet.Micro.UserManagement.Read.Domain.Model.UserModel.Queries;

namespace WanVet.Micro.UserManagement.Read.Domain.Model.UserModel.QueryHandlers
{
    public class GetUserQueryHandler : IQueryHandler<GetUserQuery, UserReadModel>
    {
        private readonly IRedisService _redisService;

        public GetUserQueryHandler(IRedisService redisService)
        {
            _redisService = redisService;
        }

        public UserReadModel Handle(GetUserQuery query)
        {
            var user = new UserReadModel();
            user = _redisService.HashGet<UserReadModel>($"{user.RedisKey}", $"{query.Email}", CommandFlags.PreferMaster);
            return user;
        }
    }
}
