using System;
using System.Collections.Generic;
using WanVet.Application.Services.User.Requests;

namespace WanVet.Application.Services.User
{
    public interface IUserService : IDisposable
    {
        void Create(CreateUserRequest request);

        UserViewModel Get(string email);

        List<UserViewModel> GetDoctors(string term);
    }
}
