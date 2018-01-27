using System;
using System.Collections.Generic;
using WanVet.Application.Services.Calendar;
using WanVet.Application.Services.Calendar.Requests;

namespace WanVet.Application.Services.User
{
    public interface ICalendarService : IDisposable
    {
        CalendarViewModel Get(Guid id);

        List<string> GetFreeSpots(Guid id, string date);

        void CheckAppointmentDisponibility(CheckAppointmentDisponibilityRequest request);

        List<AppointmentViewModel> GetAppointments(Guid id, string startDate, string endDate);

        List<AppointmentViewModel> GetOpenAppointments(Guid id, string term);
    }
}
