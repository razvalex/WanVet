using NETCore.RedisKit.Core;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using WanVet.Infrastructure.Read;
using WanVet.Micro.CalendarManagement.Read.Domain.Model.CalendarModel.Queries;

namespace WanVet.Micro.CalendarManagement.Read.Domain.Model.CalendarModel.QueryHandlers
{
    public class GetCalendarFreeSpotsQueryHandler : IQueryHandler<GetCalendarFreeSpotsQuery, List<string>>
    {
        private readonly IRedisService _redisService;

        public GetCalendarFreeSpotsQueryHandler(IRedisService redisService)
        {
            _redisService = redisService;
        }

        public List<string> Handle(GetCalendarFreeSpotsQuery query)
        {
            var calendar = new CalendarReadModel();
            calendar = _redisService.HashGet<CalendarReadModel>($"{calendar.RedisKey}", $"{query.Id}", CommandFlags.PreferMaster);
            var dayOfWeek = query.Date.DayOfWeek;
            if (calendar.WorkingHours.ContainsKey(dayOfWeek.ToString()))
            {
                var workingHours = calendar.WorkingHours[dayOfWeek.ToString()];
                var workingHoursStart = new DateTimeOffset(query.Date.Date).Add(TimeSpan.FromHours(workingHours.Item1));
                var workingHoursEnd = new DateTimeOffset(query.Date.Date).Add(TimeSpan.FromHours(workingHours.Item2));
                var startingTimeSpots = Enumerable.Range(0, int.MaxValue)
                  .Select(multiplier => workingHoursStart.Add(TimeSpan.FromMinutes(30 * multiplier)))
                  .TakeWhile(span => span <= workingHoursEnd);
                var alreadyScheduledSpots = calendar.Appointments.Select(app => app.StartingTime).ToList();
                startingTimeSpots = startingTimeSpots.Where(startingTime => !alreadyScheduledSpots.Contains(startingTime));
                return startingTimeSpots.Select(x => x.TimeOfDay.ToString()).ToList();
            }

            return new List<string>();
        }

    }
}
