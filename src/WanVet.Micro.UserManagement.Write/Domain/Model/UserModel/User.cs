
using System;
using WanVet.Infrastructure.Write.Domain;
using WanVet.Infrastructure.Write.Domain.ValueObjects;
using WanVet.Micro.UserManagement.Write.Domain.Model.UserModel.Events;

namespace WanVet.Micro.UserManagement.Write.Domain.Model.UserModel
{
    public class User : Aggregate
    {
        public User(string email, string familyName, string givenName, string phoneNumber, string gender, bool isDoctor)
        {
            if (isDoctor)
            {
                RaiseEvent(new UserCreatedEvent(email, familyName, givenName, phoneNumber, gender, new DoctorRole()));
            }
            else
            {
                RaiseEvent(new UserCreatedEvent(email, familyName, givenName, phoneNumber, gender, new UserRole()));
            }
        }

        public Guid Id { get; private set; }

        public override string IdentifierString => "user";

        public override object Identifier => $"user-{Id}";

        public string Email { get; private set; }

        public string FamilyName { get; private set; }

        public string GivenName { get; private set; }

        public string PhoneNumber { get; private set; }

        public string Gender { get; private set; }

        public Role Role { get; private set; }

        public void Apply(UserCreatedEvent @event)
        {
            Id = @event.Id;
            Email = @event.Email;
            FamilyName = @event.FamilyName;
            GivenName = @event.GivenName;
            PhoneNumber = @event.PhoneNumber;
            Gender = @event.Gender;
            Role = @event.Role;
        }
    }
}
