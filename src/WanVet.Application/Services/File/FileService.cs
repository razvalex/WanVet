using Imgur.API.Authentication.Impl;
using Imgur.API.Endpoints.Impl;
using System.IO;
using System.Threading.Tasks;
using WanVet.Application.Services.File.Requests;

namespace WanVet.Application.Services.File
{
    public class FileService : IFileService
    {
        private readonly ImgurClient _imgurClient;
        private const string _imgurClientId = "f4697ff4c4759a5";
        private const string _imgurClientSecret = "a30c0597fc6fbf9d4572eecf8721cf41fce1328d";


        public FileService()
        {
            _imgurClient = new ImgurClient(_imgurClientId, _imgurClientSecret);
        }

        public async Task<string> UploadImageBinaryToImgurAsync(ImgurImageRequest request)
        {
            var imageEndpoint = new ImageEndpoint(_imgurClient);
            var image = await imageEndpoint.UploadImageBinaryAsync(request.Content, title: request.Title, description: request.Description);
            return image == null ? null : image.Link;
        }     
    }
}
