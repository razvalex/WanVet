using System;
using System.Collections.Generic;
using System.Text;
using WanVet.Infrastructure.Read;

namespace WanVet.Micro.CalendarManagement.Read.Domain.Model.CalendarModel.Queries
{
    public class GetAppointmentsQuery : IQuery<List<AppointmentReadModel>>
    {
        public GetAppointmentsQuery(Guid id, string startDate, string endDate)
        {
            Id = id;
            StartDate = DateTimeOffset.Parse(startDate);
            EndDate = DateTimeOffset.Parse(endDate);
        }

        public Guid Id { get; private set; }

        public DateTimeOffset StartDate { get; private set; }

        public DateTimeOffset EndDate { get; private set; }
    }
}
