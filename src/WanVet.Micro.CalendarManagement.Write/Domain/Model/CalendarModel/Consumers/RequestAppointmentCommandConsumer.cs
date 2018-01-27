using MassTransit;
using System;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using WanVet.Infrastructure.Write.Domain;
using WanVet.Infrastructure.Write.Domain.ValueObjects;
using WanVet.Messaging.Commands;
using WanVet.Messaging.Events;

namespace WanVet.Micro.CalendarManagement.Write.Domain.Model.CalendarModel.Consumers
{
    public class RequestAppointmentCommandConsumer : IConsumer<IRequestAppointmentCommand>
    {
        private readonly IRepository _repository;

        public RequestAppointmentCommandConsumer(IRepository repository)
        {
            _repository = repository;
        }

        public async Task Consume(ConsumeContext<IRequestAppointmentCommand> context)
        {
            var command = context.Message;
            var calendar = await _repository.GetById<Calendar>(command.CalendarId);
            var appointmentDate = DateTimeOffset.Parse(command.Date).Date;
            var appointmentTime = DateTime.ParseExact(command.Time, "HH:mm:ss", CultureInfo.InvariantCulture).TimeOfDay;
            var appointmentDateRequested = appointmentDate.Add(appointmentTime);
            var dayOfWeek = appointmentDate.DayOfWeek;
            if (calendar.WorkingHours.ContainsKey(dayOfWeek.ToString()))
            {
                var workingHours = calendar.WorkingHours[dayOfWeek.ToString()];
                var workingHoursStart = new DateTimeOffset(appointmentDate.Date.Date).Add(TimeSpan.FromHours(workingHours.Item1));
                var workingHoursEnd = new DateTimeOffset(appointmentDate.Date.Date).Add(TimeSpan.FromHours(workingHours.Item2));
                var startingTimeSpots = Enumerable.Range(0, int.MaxValue)
                  .Select(multiplier => workingHoursStart.Add(TimeSpan.FromMinutes(30 * multiplier)))
                  .TakeWhile(span => span <= workingHoursEnd);
                var alreadyScheduledSpots = calendar.Appointments.Where(app => app.State.Equals(new Open())).Select(app => app.StartingTime).ToList();
                startingTimeSpots = startingTimeSpots.Where(startingTime => !alreadyScheduledSpots.Contains(startingTime));
                if (startingTimeSpots.Contains(appointmentDateRequested))
                {
                    await context.Publish<IAppointmentDisponibilityConfirmedEvent>(new
                    {
                        Timestamp = DateTimeOffset.UtcNow,
                        MessageType = typeof(IAppointmentDisponibilityConfirmedEvent).Name,
                        AggregateId = calendar.Id,
                        Version = calendar.Version,
                        StartingTime = new DateTimeOffset(appointmentDateRequested),
                        PetId = command.PetId,
                        PetName = command.PetName,
                        OwnerId = command.OwnerId,
                        OwnerFamilyName = command.OwnerFamilyName,
                        OwnerGivenName = command.OwnerGivenName,
                        DoctorId = calendar.UserId
                    });
                }
                else
                {
                    throw new Exception("We cannot handle requested date/time. Already booked.");
                }
            }
        }
    }
}
