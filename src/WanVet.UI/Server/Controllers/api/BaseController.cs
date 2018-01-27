using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WanVet.UI.Server.Controllers.Api
{
    [Authorize("WanVetUser")]
    public class BaseController : Controller
    {
    } 
}
