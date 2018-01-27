using MassTransit;
using Refit;
using System;
using System.Threading.Tasks;
using WanVet.Application.Services.Pet.Requests;
using WanVet.Messaging;
using WanVet.Messaging.Commands;

namespace WanVet.Application.Services.Pet
{
    public class PetService : IPetService
    {
        private readonly ISendEndpoint _endpoint;
        private readonly IPetApi _petApi = RestService.For<IPetApi>("http://localhost:5084/");

        public PetService(IBusControl busControl)
        {
            _endpoint = busControl.GetSendEndpoint(new Uri($"{RabbitMQConstants.RabbitMQUri}{RabbitMQConstants.PetManagementWriteQueue}")).Result;
        }

        public void Create(CreatePetRequest request)
        {
            _endpoint.Send<ICreatePetCommand>(new
            {
                OwnerId = request.OwnerId,
                OwnerEmail = request.OwnerEmail,
                Name = request.Name,
                Breed = request.Breed,
                Sex = request.Sex,
                Species = request.Species,
                ColorHex = request.ColorHex,
                BirthDate = request.BirthDate,
                ProfileImageUrl = request.ProfileImageUrl,
                MessageType = (typeof(ICreatePetCommand)).Name,
                Timestamp = DateTimeOffset.UtcNow
            }).Wait();
        }

        public PetViewModel Get(Guid id)
        {
            var getPetTask = _petApi.Get(id);
            Task.WaitAll(getPetTask);
            return getPetTask.Result;
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
