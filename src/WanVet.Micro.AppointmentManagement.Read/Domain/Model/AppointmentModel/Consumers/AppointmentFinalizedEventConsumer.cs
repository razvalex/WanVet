using MassTransit;
using NETCore.RedisKit.Core;
using StackExchange.Redis;
using System.Threading.Tasks;
using WanVet.Messaging.Events;

namespace WanVet.Micro.AppointmentManagement.Read.Domain.Model.AppointmentModel.Consumers
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
            var appointment = new AppointmentReadModel();
            appointment = _redisService.HashGet<AppointmentReadModel>($"{appointment.RedisKey}", $"{@event.AggregateId}", CommandFlags.PreferMaster);
            appointment.State = @event.State;
            appointment.Version = @event.Version;
            appointment.MedicalHistory = @event.MedicalHistory;
            appointment.Diagnostic = @event.Diagnostic;
            _redisService.HashSet($"{appointment.RedisKey}", $"{@event.AggregateId}", appointment, When.Always, CommandFlags.PreferMaster);
        }
    }
}
