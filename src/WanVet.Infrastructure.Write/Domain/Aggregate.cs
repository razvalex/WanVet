
using System;
using System.Collections.Generic;

namespace WanVet.Infrastructure.Write.Domain
{
    public abstract class Aggregate : IAggregate
    {
        private readonly List<object> _uncommittedEvents = new List<object>();

        public abstract object Identifier { get; }

        public int Version { get; private set; } = -1;

        public abstract string IdentifierString { get; }

        public void ApplyEvent(object @event)
        {
            ((dynamic)this).Apply((dynamic)@event);
            Version++;
        }

        public ICollection<object> GetUncommittedEvents()
        {
            return _uncommittedEvents;
        }

        public void ClearUncommittedEvents()
        {
            _uncommittedEvents.Clear();
        }

        protected void RaiseEvent(object @event)
        {
            ((IAggregate)this).ApplyEvent(@event);
            _uncommittedEvents.Add(@event);
        }
    }
}
