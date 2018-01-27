using MassTransit;
using Refit;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WanVet.Application.Services.User.Requests;
using WanVet.Messaging;
using WanVet.Messaging.Commands;

namespace WanVet.Application.Services.User
{
    public class UserService : IUserService
    {
        private readonly ISendEndpoint _endpoint;
        private readonly IUserApi _userApi = RestService.For<IUserApi>("http://localhost:5086/");

        public UserService(IBusControl busControl)
        {
            _endpoint = busControl.GetSendEndpoint(new Uri($"{RabbitMQConstants.RabbitMQUri}{RabbitMQConstants.UserManagementWriteQueue}")).Result;
        }

        public void Create(CreateUserRequest request)
        {
            _endpoint.Send<ICreateUserCommand>(new
            {
                Email = request.Email,
                FamilyName = request.FamilyName,
                GivenName = request.GivenName,
                PhoneNumber = request.PhoneNumber,
                Gender = request.Gender,
                IsDoctor = request.IsDoctor,
                MessageType = (typeof(ICreateUserCommand)).Name,
                Timestamp = DateTimeOffset.UtcNow
            }).Wait();
        }

        public UserViewModel Get(string email)
        {
            var getUserTask = _userApi.Get(email);
            Task.WaitAll(getUserTask);
            return getUserTask.Result;
        }

        public List<UserViewModel> GetDoctors(string term)
        {
            var getDoctorsTask = _userApi.GetDoctors(term);
            Task.WaitAll(getDoctorsTask);
            return getDoctorsTask.Result;
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
