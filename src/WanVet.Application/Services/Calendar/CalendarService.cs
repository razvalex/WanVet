using MassTransit;
using Refit;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WanVet.Messaging;
using WanVet.Application.Services.Calendar;
using WanVet.Application.Services.Calendar.Requests;
using WanVet.Messaging.Commands;

namespace WanVet.Application.Services.User
{
    public class CalendarService : ICalendarService
    {
        private readonly ISendEndpoint _endpoint;
        private readonly ICalendarApi _calendarApi = RestService.For<ICalendarApi>("http://localhost:5088/");

        public CalendarService(IBusControl busControl)
        {
            _endpoint = busControl.GetSendEndpoint(new Uri($"{RabbitMQConstants.RabbitMQUri}{RabbitMQConstants.CalendarManagementWriteQueue}")).Result;
        }

        public void CheckAppointmentDisponibility(CheckAppointmentDisponibilityRequest request)
        {
            _endpoint.Send<IRequestAppointmentCommand>(new
            {
                CalendarId = request.CalendarId,
                PetId = request.PetId,
                PetName = request.PetName,
                OwnerId = request.OwnerId,
                OwnerFamilyName = request.OwnerFamilyName,
                OwnerGivenName = request.OwnerGivenName,
                Date = request.Date,
                Time = request.Time,
                MessageType = (typeof(IRequestAppointmentCommand)).Name,
                Timestamp = DateTimeOffset.UtcNow
            }).Wait();
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }

        public CalendarViewModel Get(Guid id)
        {
            var getCalendarTask = _calendarApi.Get(id);
            Task.WaitAll(getCalendarTask);
            return getCalendarTask.Result;
        }

        public List<string> GetFreeSpots(Guid id, string date)
        {
            var getFreeSpotsTask = _calendarApi.GetFreeSpots(id, date);
            Task.WaitAll(getFreeSpotsTask);
            return getFreeSpotsTask.Result;
        }

        public List<AppointmentViewModel> GetAppointments(Guid id, string startDate, string endDate)
        {
            var getAppointmentsTask = _calendarApi.GetAppointments(id, startDate, endDate);
            Task.WaitAll(getAppointmentsTask);
            return getAppointmentsTask.Result;
        }

        public List<AppointmentViewModel> GetOpenAppointments(Guid id, string term)
        {
            var getOpenAppointmentsTask = _calendarApi.GetOpenAppointments(id, term);
            Task.WaitAll(getOpenAppointmentsTask);
            return getOpenAppointmentsTask.Result;
        }
    }
}
