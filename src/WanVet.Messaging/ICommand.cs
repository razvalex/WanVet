
namespace WanVet.Messaging
{
    public interface ICommand : IMessage
    {
        int ExpectedVersion { get; set; }
    }
}
