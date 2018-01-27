
namespace WanVet.Messaging.Commands
{
    public interface ICreateUserCommand : ICommand
    {
        string Email { get; }

        string FamilyName { get; }

        string GivenName { get; }

        string PhoneNumber { get; }

        string Gender { get; }

        bool IsDoctor { get; }
    }
}
