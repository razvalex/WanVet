using System;
using System.Collections.Generic;
using WanVet.Infrastructure.Read;

namespace WanVet.Micro.CalendarManagement.Read.Domain.Model.CalendarModel.Queries
{
    public class GetOpenAppointmentsQuery : IQuery<List<AppointmentReadModel>>
    {
        public GetOpenAppointmentsQuery(Guid id, string term)
        {
            Id = id;
            Term = term;
        }

        public Guid Id { get; private set; }

        public string Term { get; private set; }
    }
}
