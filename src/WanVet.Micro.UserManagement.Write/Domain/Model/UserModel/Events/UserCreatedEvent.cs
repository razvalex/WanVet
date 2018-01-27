using System;
using WanVet.Infrastructure.Write.Domain.ValueObjects;

namespace WanVet.Micro.UserManagement.Write.Domain.Model.UserModel.Events
{
    public class UserCreatedEvent
    {
        public UserCreatedEvent(string email, string familyName, string givenName, string phoneNumber, string gender, Role role, Guid? id = null)
        {
            Id = id.HasValue ? id.Value : Guid.NewGuid();
            Email = email;
            FamilyName = familyName;
            GivenName = givenName;
            PhoneNumber = phoneNumber;
            Gender = gender;
            Role = role;
        }

        public Guid Id { get; }

        public string Email { get; }

        public string FamilyName { get; }

        public string GivenName { get; }

        public string PhoneNumber { get; }

        public string Gender { get; }

        public Role Role { get; }
    }
}
