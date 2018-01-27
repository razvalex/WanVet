
namespace WanVet.Application.Services.User.Requests
{
    public class CreateUserRequest
    {
        public string Email { get; set; }

        public string FamilyName { get; set; }

        public string GivenName { get; set; }

        public string PhoneNumber { get; set; }

        public string Gender { get; set; }

        public bool IsDoctor { get; set; }
    }
}
