
namespace WanVet.Messaging.Events
{
    public interface IUserCreatedEvent : IEvent
    {
        string Email { get; }

        string FamilyName { get; }

        string GivenName { get; }

        string PhoneNumber { get; }

        string Gender { get; }

        string Role { get; }
    }
}
