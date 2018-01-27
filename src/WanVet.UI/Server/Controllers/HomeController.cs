using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace WanVet.UI.Server.Controllers
{
    [AllowAnonymous]
    public class HomeController : Controller
    {
        private readonly IHostingEnvironment _env;

        public HomeController(IHostingEnvironment env)
        {
            _env = env;
        }

        public IActionResult Index()
        {
            ViewBag.HashedMain = GetHashedMainDotJs();

            return View();
        }

        public string GetHashedMainDotJs()
        {
            var basePath = _env.WebRootPath + "//dist//";

            var info = new System.IO.DirectoryInfo(basePath);

            var file = info.GetFiles().FirstOrDefault(f => f.Name.StartsWith("main.") && !f.Name.EndsWith("bundle.map"));

            return file.Name;
        }

    }
}
