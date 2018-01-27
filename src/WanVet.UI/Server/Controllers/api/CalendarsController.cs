using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using WanVet.Application.Services.Calendar;
using WanVet.Application.Services.Calendar.Requests;
using WanVet.Application.Services.User;
using WanVet.UI.Server.Controllers.Api;

namespace WanVet.UI.Server.Controllers.api
{
    [Route("api/[controller]")]
    public class CalendarsController : BaseController
    {
        private readonly ICalendarService _calendarService;

        public CalendarsController(ICalendarService calendarService)
        {
            _calendarService = calendarService;
        }

        [HttpGet]
        public CalendarViewModel Get(Guid id)
        {
            return _calendarService.Get(id);
        }

        [HttpGet]
        [Route("freespots")]
        public List<string> GetFreeSpots(Guid id, string date)
        {
            return _calendarService.GetFreeSpots(id, date);
        }

        [HttpPost]
        [Route("checkappointmentdisponibility")]
        public IActionResult Post([FromBody]CheckAppointmentDisponibilityRequest request)
        {
            _calendarService.CheckAppointmentDisponibility(request);
            return NoContent();
        }

        [HttpGet]
        [Route("appointments")]
        public List<AppointmentViewModel> GetAppointments(Guid id, string startDate, string endDate)
        {
            return _calendarService.GetAppointments(id, startDate, endDate);
        }


        [HttpGet]
        [Route("openappointments")]
        public List<AppointmentViewModel> GetOpenAppointments(Guid id, string term)
        {
            return _calendarService.GetOpenAppointments(id, term);
        }

    }
}
