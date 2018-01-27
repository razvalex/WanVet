using Refit;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WanVet.Application.Services.User
{
    public interface IUserApi
    {
        [Get("/{email}")]
        Task<UserViewModel> Get(string email);

        [Get("/doctors/{term}")]
        Task<List<UserViewModel>> GetDoctors(string term);
    }
}
