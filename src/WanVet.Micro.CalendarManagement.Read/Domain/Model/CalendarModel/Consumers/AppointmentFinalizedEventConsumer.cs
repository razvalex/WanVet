using MassTransit;
using NETCore.RedisKit.Core;
using StackExchange.Redis;
using System.Linq;
using System.Threading.Tasks;
using WanVet.Messaging.Events;

namespace WanVet.Micro.CalendarManagement.Read.Domain.Model.CalendarModel.Consumers
{
    public class AppointmentFinalizedEventConsumer : IConsumer<IAppointmentFinalizedEvent>
    {
        private readonly IRedisService _redisService;

        public AppointmentFinalizedEventConsumer(IRedisService redisService)
        {
            _redisService = redisService;
        }

        public async Task Consume(ConsumeContext<IAppointmentFinalizedEvent> context)
        {
            var @event = context.Message;
            var calendar = new CalendarReadModel();
            calendar = _redisService.HashGet<CalendarReadModel>($"{calendar.RedisKey}", $"{@event.CalendarId}", CommandFlags.PreferMaster);
            var oldAppointment = calendar.Appointments.FirstOrDefault(a => a.Id == @event.AggregateId);
            calendar.Appointments.Remove(oldAppointment);
            calendar.Appointments.Add(new AppointmentReadModel
            {
                Id = oldAppointment.Id,
                OwnerFamilyName = oldAppointment.OwnerFamilyName,
                OwnerGivenName = oldAppointment.OwnerGivenName,
                OwnerId = oldAppointment.OwnerId,
                PetId = oldAppointment.PetId,
                PetName = oldAppointment.PetName,
                StartingTime = oldAppointment.StartingTime,
                State = @event.State,
                MedicalHistory = @event.MedicalHistory,
                Diagnostic = @event.Diagnostic
            });
            _redisService.HashSet($"{calendar.RedisKey}", $"{@event.CalendarId}", calendar, When.Always, CommandFlags.PreferMaster);
        }
    }
}
