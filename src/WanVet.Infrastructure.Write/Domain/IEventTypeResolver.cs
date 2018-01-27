using System;

namespace WanVet.Infrastructure.Write.Domain
{
    public interface IEventTypeResolver
    {
        Type GetTypeForEventName(string name);
    }
}
