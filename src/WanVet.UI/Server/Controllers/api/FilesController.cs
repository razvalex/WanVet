using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Threading.Tasks;
using WanVet.Application.Services.File;
using WanVet.Application.Services.File.Requests;
using WanVet.UI.Server.Controllers.Api;

namespace WanVet.UI.Server.Controllers.api
{
    [Route("api/[controller]")]
    public class FilesController : BaseController
    {
        private readonly IFileService _fileService;

        public FilesController(IFileService fileService)
        {
            _fileService = fileService;
        }

        [HttpPost]
        public string Post(IFormFile image)
        {
            var uploadImageToImgurTask = _fileService.UploadImageBinaryToImgurAsync(new ImgurImageRequest
            {
                Content = FormFileToByteArray(image),
                Title = image.Name
            });
            Task.WaitAll(uploadImageToImgurTask);
            return uploadImageToImgurTask.Result;
        }

        private static byte[] FormFileToByteArray(IFormFile formFile)
        {
            using (MemoryStream ms = new MemoryStream())
            {
                formFile.CopyTo(ms);
                return ms.ToArray();
            }
        }
    }
}
