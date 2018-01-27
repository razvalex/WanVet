using System;
using System.Collections.Generic;
using System.Text;
using WanVet.Infrastructure.Read;

namespace WanVet.Micro.CalendarManagement.Read.Domain.Model.CalendarModel.Queries
{
    public class GetCalendarFreeSpotsQuery : IQuery<List<string>>
    {
        public GetCalendarFreeSpotsQuery(Guid id, string date)
        {
            Id = id;
            Date = DateTimeOffset.Parse(date);
        }

        public Guid Id { get; private set; }

        public DateTimeOffset Date { get; private set; }
    }
}
