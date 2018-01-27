using System;
using System.Collections.Generic;
using WanVet.Infrastructure.Read;

namespace WanVet.Micro.UserManagement.Read.Domain.Model.UserModel
{
    public class UserReadModel : IRedisReadModel
    {
        public UserReadModel()
        {
            Pets = new List<PetReadModel>();
        }

        public Guid Id { get; set; }

        public Guid? CalendarId { get; set; }

        public string Email { get; set; }

        public string FamilyName { get; set; }

        public string GivenName { get; set; }

        public string PhoneNumber { get; set; }

        public string Gender { get; set; }

        public int Version { get; set; }

        public string Role { get; set; }

        public List<PetReadModel> Pets { get; set; }

        public string RedisKey => "user";
    }


    public class PetReadModel
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Breed { get; set; }

        public string Sex { get; set; }

        public string Species { get; set; }

        public string ProfileImageUrl { get; set; }
    }
}
