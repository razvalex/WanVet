
using System;
using WanVet.Infrastructure.Read;

namespace WanVet.Micro.UserManagement.Read.Domain.Model.UserModel.Queries
{
    public class GetUserQuery : IQuery<UserReadModel>
    {
        public GetUserQuery(string email)
        {
            Email = email;
        }

        public string Email { get; private set; }
    }
}
