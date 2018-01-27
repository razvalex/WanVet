using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using WanVet.Application.Services.User;
using WanVet.Application.Services.User.Requests;

namespace WanVet.UI.Server.Controllers.Api
{
    [Route("api/[controller]")]
    public class UsersController : BaseController
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public IActionResult Post([FromBody]CreateUserRequest request)
        {
            _userService.Create(request);
            return NoContent();
        }

        [HttpGet]
        public UserViewModel Get(string email)
        {        
            return _userService.Get(email);
        }

        [HttpGet]
        [Route("doctors")]
        public List<UserViewModel> GetDoctors(string term)
        {
            return _userService.GetDoctors(term);
        }
    }
}
