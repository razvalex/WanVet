using NETCore.RedisKit.Core;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using WanVet.Infrastructure.Read;
using WanVet.Micro.CalendarManagement.Read.Domain.Model.CalendarModel.Queries;

namespace WanVet.Micro.CalendarManagement.Read.Domain.Model.CalendarModel.QueryHandlers
{
    public class GetOpenAppointmentsQueryHandler : IQueryHandler<GetOpenAppointmentsQuery, List<AppointmentReadModel>>
    {
        private readonly IRedisService _redisService;

        public GetOpenAppointmentsQueryHandler(IRedisService redisService)
        {
            _redisService = redisService;
        }

        public List<AppointmentReadModel> Handle(GetOpenAppointmentsQuery query)
        {
            var calendar = new CalendarReadModel();
            calendar = _redisService.HashGet<CalendarReadModel>($"{calendar.RedisKey}", $"{query.Id}", CommandFlags.PreferMaster);
            var openAppointments = calendar.Appointments.Where(x => x.State == "Open");
            if (!string.IsNullOrWhiteSpace(query.Term))
            {
                openAppointments = openAppointments.Where(x => x.PetName.ToLower().Contains(query.Term.ToLower()) ||
                                                             x.OwnerFamilyName.ToLower().Contains(query.Term.ToLower()) || x.OwnerGivenName.ToLower().Contains(query.Term.ToLower())).ToList();
            }
            return openAppointments.ToList();
        }
    }
}
