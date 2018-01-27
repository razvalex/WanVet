using System;
using System.Collections.Generic;
using System.Text;
using WanVet.Infrastructure.Read;

namespace WanVet.Micro.CalendarManagement.Read.Domain.Model.CalendarModel.Queries
{
    public class GetCalendarQuery : IQuery<CalendarReadModel>
    {
        public GetCalendarQuery(Guid id)
        {
            Id = id;
        }

        public Guid Id { get; private set; }
    }
}
