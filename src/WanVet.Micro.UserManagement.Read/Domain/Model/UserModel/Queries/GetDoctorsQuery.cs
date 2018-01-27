
using System.Collections.Generic;
using WanVet.Infrastructure.Read;

namespace WanVet.Micro.UserManagement.Read.Domain.Model.UserModel.Queries
{
    public class GetDoctorsQuery : IQuery<List<UserReadModel>>
    {
        public GetDoctorsQuery(string term)
        {
            Term = term;
        }

        public string Term { get; private set; }

    }
}
