using Refit;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WanVet.Application.Services.Calendar;

namespace WanVet.Application.Services.User
{
    public interface ICalendarApi
    {
        [Get("/{id}")]
        Task<CalendarViewModel> Get(Guid id);

        [Get("/{id}/freespots/{date}")]
        Task<List<string>> GetFreeSpots(Guid id, string date);

        [Get("/{id}/appointments/{startDate}/{endDate}")]
        Task<List<AppointmentViewModel>> GetAppointments(Guid id, string startDate, string endDate);

        [Get("/{id}/openappointments/{term}")]
        Task<List<AppointmentViewModel>> GetOpenAppointments(Guid id, string term);
    }
}
