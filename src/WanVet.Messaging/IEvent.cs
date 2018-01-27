
namespace WanVet.Messaging
{
    public interface IEvent : IMessage
    {
        int Version { get; set; }
    }
}
