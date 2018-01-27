using MassTransit;
using NETCore.RedisKit.Core;
using StackExchange.Redis;
using System.Linq;
using System.Threading.Tasks;
using WanVet.Messaging.Events;

namespace WanVet.Micro.PetManagement.Read.Domain.Model.PetModel.Consumers
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
            var pet = new PetReadModel();
            pet = _redisService.HashGet<PetReadModel>($"{pet.RedisKey}", $"{@event.PetId}", CommandFlags.PreferMaster);
            var oldAppointment = pet.Appointments.FirstOrDefault(a => a.Id == @event.AggregateId);
            pet.Appointments.Remove(oldAppointment);
            pet.Appointments.Add(new AppointmentReadModel
            {
                Id = oldAppointment.Id,
                OwnerFamilyName = oldAppointment.OwnerFamilyName,
                OwnerGivenName = oldAppointment.OwnerGivenName,
                OwnerId = oldAppointment.OwnerId,
                DoctorId = oldAppointment.DoctorId,
                PetId = oldAppointment.PetId,
                PetName = oldAppointment.PetName,
                StartingTime = oldAppointment.StartingTime,
                State = @event.State,
                MedicalHistory = @event.MedicalHistory,
                Diagnostic = @event.Diagnostic
            });
            _redisService.HashSet($"{pet.RedisKey}", $"{@event.PetId}", pet, When.Always, CommandFlags.PreferMaster);
        }
    }
}
