

using System.Threading.Tasks;
using WanVet.Application.Services.File.Requests;

namespace WanVet.Application.Services.File
{
    public interface IFileService
    {
        Task<string> UploadImageBinaryToImgurAsync(ImgurImageRequest request);
    }
}
