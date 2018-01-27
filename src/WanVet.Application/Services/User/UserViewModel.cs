
using System.Collections.Generic;

namespace WanVet.Application.Services.User
{
    public class UserViewModel
    {
        public string Id { get; set; }

        public string CalendarId { get; set; }

        public string Email { get; set; }

        public string FamilyName { get; set; }

        public string GivenName { get; set; }

        public string PhoneNumber { get; set; }

        public string Gender { get; set; }

        public List<PetViewModel> Pets { get; set; }
    }

    public class PetViewModel
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Breed { get; set; }

        public string Sex { get; set; }

        public string Species { get; set; }

        public string ProfileImageUrl { get; set; }
    }
}
