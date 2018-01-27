
using System.Collections.Generic;

namespace WanVet.Infrastructure.Write.Domain
{
    public interface IAggregate
    {
        int Version { get; }

        object Identifier { get; }

        string IdentifierString { get; }

        void ApplyEvent(object @event);

        ICollection<object> GetUncommittedEvents();

        void ClearUncommittedEvents();
    }
}
