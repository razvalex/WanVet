
using System;
using System.Collections.Generic;
using WanVet.Infrastructure.Write.Domain;
using WanVet.Infrastructure.Write.Domain.ValueObjects;
using WanVet.Micro.CalendarManagement.Write.Domain.Model.CalendarModel.Entities;
using WanVet.Micro.CalendarManagement.Write.Domain.Model.CalendarModel.Events;
using WanVet.Micro.CalendarManagement.Write.Domain.Model.CalendarModel.ValueObjects;

namespace WanVet.Micro.CalendarManagement.Write.Domain.Model.CalendarModel
{
    public class Calendar : Aggregate
    {
        public Calendar()
        {

        }

        public Calendar(Guid userId)
        {
            RaiseEvent(new CalendarCreatedEvent(userId));
            RaiseEvent(new CalendarWorkingHoursSpecifiedEvent(new Monday(), new NineToFiveWorkingHours()));
            RaiseEvent(new CalendarWorkingHoursSpecifiedEvent(new Tuesday(), new NineToFiveWorkingHours()));
            RaiseEvent(new CalendarWorkingHoursSpecifiedEvent(new Wednesday(), new NineToFiveWorkingHours()));
            RaiseEvent(new CalendarWorkingHoursSpecifiedEvent(new Thursday(), new NineToFiveWorkingHours()));
            RaiseEvent(new CalendarWorkingHoursSpecifiedEvent(new Friday(), new NineToFiveWorkingHours()));
            RaiseEvent(new CalendarWorkingHoursSpecifiedEvent(new Saturday(), new NineToTwelveWorkingHours()));
        }

        public Guid Id { get; private set; }

        public override object Identifier => $"calendar-{Id}";

        public override string IdentifierString => "calendar";

        public Guid UserId { get; private set; }

        public Dictionary<string, Tuple<int, int>> WorkingHours { get; private set; }

        public List<Appointment> Appointments { get; private set; }

        public void Apply(CalendarCreatedEvent @event)
        {
            Id = @event.Id;
            UserId = @event.UserId;
            WorkingHours = new Dictionary<string, Tuple<int, int>>();
            Appointments = new List<Appointment>();
        }

        public void Apply(CalendarWorkingHoursSpecifiedEvent @event)
        {
            WorkingHours[@event.Day.Name] = new Tuple<int, int>(@event.WorkingHours.Start, @event.WorkingHours.End);
        }

        public void AddAppointment(AppointmentCreatedEvent @event){
            RaiseEvent(@event);
        }

        public void Apply(AppointmentCreatedEvent @event)
        {
            var open = new Open();
            var completed = new Completed();
            var currentState = new AppointmentState(@event.State);
            var appointment = new Appointment
            {
                Id = @event.Id,
                OwnerFamilyName = @event.OwnerFamilyName,
                OwnerGivenName = @event.OwnerGivenName,
                OwnerId = @event.OwnerId,
                PetId = @event.PetId,
                PetName = @event.PetName,
                StartingTime = @event.StartingTime
            };
            if (currentState.Equals(open))
            {
                appointment.State = open;
            }
            else
            {
                appointment.State = completed;
            }
            Appointments.Add(appointment);
        }
    }
}
