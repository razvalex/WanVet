using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using WanVet.Application.Services.Appointment;
using WanVet.Application.Services.Appointment.Requests;
using WanVet.UI.Server.Controllers.Api;

namespace WanVet.UI.Server.Controllers.api
{
    [Route("api/[controller]")]
    public class AppointmentsController : BaseController
    {
        private readonly IAppointmentService _appointmentService;

        public AppointmentsController(IAppointmentService appointmentService)
        {
            _appointmentService = appointmentService;
        }

        [HttpPost]
        public IActionResult Post([FromBody]FinalizeAppointmentRequest request)
        {
            _appointmentService.Finalize(request);
            return NoContent();
        }
    }
}
