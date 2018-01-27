using NETCore.RedisKit.Core;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WanVet.Infrastructure.Read;
using WanVet.Micro.CalendarManagement.Read.Domain.Model.CalendarModel.Queries;

namespace WanVet.Micro.CalendarManagement.Read.Domain.Model.CalendarModel.QueryHandlers
{
    public class GetAppointmentsQueryHandler : IQueryHandler<GetAppointmentsQuery, List<AppointmentReadModel>>
    {
        private readonly IRedisService _redisService;

        public GetAppointmentsQueryHandler(IRedisService redisService)
        {
            _redisService = redisService;
        }

        public List<AppointmentReadModel> Handle(GetAppointmentsQuery query)
        {
            var calendar = new CalendarReadModel();
            calendar = _redisService.HashGet<CalendarReadModel>($"{calendar.RedisKey}", $"{query.Id}", CommandFlags.PreferMaster);
            return calendar.Appointments.Where(x => x.StartingTime >= query.StartDate && x.StartingTime <= query.EndDate.AddHours(24).AddSeconds(-1)).ToList();
        }
    }
}
