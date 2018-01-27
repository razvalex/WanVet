
using System;
using WanVet.Infrastructure.Write.Domain;
using WanVet.Infrastructure.Write.Domain.ValueObjects;
using WanVet.Micro.AppointmentManagement.Write.Domain.Model.AppointmentModel.Events;

namespace WanVet.Micro.AppointmentManagement.Write.Domain.Model.AppointmentModel
{
    public class Appointment : Aggregate
    {
        public Appointment()
        {

        }

        public Appointment(Guid calendarId, Guid petId, string petName, Guid ownerId, string ownerFamilyName,
            string ownerGivenName, Guid doctorId, DateTimeOffset startingTime)
        {
            RaiseEvent(new AppointmentCreatedEvent(calendarId, petId, petName, ownerId, ownerFamilyName,
                ownerGivenName, doctorId, startingTime));
        }

        public Guid Id { get; private set; }

        public override object Identifier => $"appointment-{Id}";

        public override string IdentifierString => "appointment";

        public Guid CalendarId { get; private set; }

        public Guid PetId { get; private set; }

        public string PetName { get; private set; }

        public Guid OwnerId { get; private set; }

        public string OwnerFamilyName { get; private set; }

        public string OwnerGivenName { get; private set; }

        public Guid DoctorId { get; private set; }

        public DateTimeOffset StartingTime { get; private set; }

        public AppointmentState State { get; private set; }

        public string Diagnostic { get; private set; }

        public string MedicalHistory { get; private set; }

        public void Apply(AppointmentCreatedEvent @event)
        {
            Id = @event.Id;
            CalendarId = @event.CalendarId;
            PetId = @event.PetId;
            PetName = @event.PetName;
            OwnerId = @event.OwnerId;
            OwnerFamilyName = @event.OwnerFamilyName;
            OwnerGivenName = @event.OwnerGivenName;
            DoctorId = @event.DoctorId;
            StartingTime = @event.StartingTime;
            State = @event.State;
        }

        public void Finalize(string diagnostic, string medicalHistory)
        {
            RaiseEvent(new AppointmentFinalizedEvent(diagnostic, medicalHistory));
        }

        public void Apply(AppointmentFinalizedEvent @event)
        {
            Diagnostic = @event.Diagnostic;
            MedicalHistory = @event.MedicalHistory;
            State = new Completed();
        }
    }
}
