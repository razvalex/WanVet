using Microsoft.AspNetCore.Mvc;
using System;
using WanVet.Application.Services.Pet;
using WanVet.Application.Services.Pet.Requests;

namespace WanVet.UI.Server.Controllers.Api
{
    [Route("api/[controller]")]
    public class PetsController : BaseController
    {
        private readonly IPetService _petService;

        public PetsController(IPetService petService)
        {
            _petService = petService;
        }

        [HttpPost]
        public IActionResult Post([FromBody]CreatePetRequest request)
        {
            _petService.Create(request);
            return NoContent();
        }

        [HttpGet]
        public PetViewModel Get(Guid id)
        {
            return _petService.Get(id);
        }
    }
}
