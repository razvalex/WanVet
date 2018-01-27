using MassTransit;
using NETCore.RedisKit.Core;
using StackExchange.Redis;
using System.Threading.Tasks;
using WanVet.Messaging.Events;

namespace WanVet.Micro.PetManagement.Read.Domain.Model.PetModel.Consumers
{
    public class AppointmentCreatedEventConsumer : IConsumer<IAppointmentCreatedEvent>
    {
        private readonly IRedisService _redisService;

        public AppointmentCreatedEventConsumer(IRedisService redisService)
        {
            _redisService = redisService;
        }

        public async Task Consume(ConsumeContext<IAppointmentCreatedEvent> context)
        {
            var @event = context.Message;
            var pet = new PetReadModel();
            pet = _redisService.HashGet<PetReadModel>($"{pet.RedisKey}", $"{@event.PetId}", CommandFlags.PreferMaster);
            pet.Appointments.Add(new AppointmentReadModel
            {
                Id = @event.AggregateId,
                CalendarId = @event.CalendarId,
                DoctorId = @event.DoctorId,
                OwnerFamilyName = @event.OwnerFamilyName,
                OwnerGivenName = @event.OwnerGivenName,
                OwnerId = @event.OwnerId,
                PetId = @event.PetId,
                PetName = @event.PetName,
                StartingTime = @event.StartingTime,
                State = @event.State
            });
            _redisService.HashSet($"{pet.RedisKey}", $"{pet.Id}", pet, When.Always, CommandFlags.PreferMaster);
        }
    }

}
