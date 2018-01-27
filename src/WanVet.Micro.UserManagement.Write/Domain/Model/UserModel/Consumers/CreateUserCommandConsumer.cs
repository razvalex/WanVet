using MassTransit;
using System;
using System.Threading.Tasks;
using WanVet.Infrastructure.Write.Domain;
using WanVet.Messaging.Commands;
using WanVet.Messaging.Events;

namespace WanVet.Micro.UserManagement.Write.Domain.Model.UserModel.Consumers
{
    public class CreateUserCommandConsumer : IConsumer<ICreateUserCommand>
    {
        private readonly IRepository _repository;

        public CreateUserCommandConsumer(IRepository repository)
        {
            _repository = repository;
        }

        public async Task Consume(ConsumeContext<ICreateUserCommand> context)
        {
            var command = context.Message;
            var user = new User(command.Email, command.FamilyName, command.GivenName, command.PhoneNumber, command.Gender, command.IsDoctor);
            await _repository.SaveAsync(user);
            await context.Publish<IUserCreatedEvent>(new
            {
                Version = user.Version,
                Timestamp = DateTimeOffset.UtcNow,
                MessageType = typeof(IUserCreatedEvent).Name,
                AggregateId = user.Id,
                Email = user.Email,
                FamilyName = user.FamilyName,
                GivenName = user.GivenName,
                PhoneNumber = user.PhoneNumber,
                Gender = user.Gender, 
                Role = user.Role.Name
            });
        }
    }
}
