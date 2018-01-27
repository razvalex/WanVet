using NETCore.RedisKit.Core;
using StackExchange.Redis;
using WanVet.Infrastructure.Read;
using WanVet.Micro.CalendarManagement.Read.Domain.Model.CalendarModel.Queries;

namespace WanVet.Micro.CalendarManagement.Read.Domain.Model.CalendarModel.QueryHandlers
{
    public class GetCalendarQueryHandler : IQueryHandler<GetCalendarQuery, CalendarReadModel>
    {
        private readonly IRedisService _redisService;

        public GetCalendarQueryHandler(IRedisService redisService)
        {
            _redisService = redisService;
        }

        public CalendarReadModel Handle(GetCalendarQuery query)
        {
            var calendar = new CalendarReadModel();
            calendar = _redisService.HashGet<CalendarReadModel>($"{calendar.RedisKey}", $"{query.Id}", CommandFlags.PreferMaster);
            return calendar;
        }
    }
}
