using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace WanVet.Infrastructure.Write.Domain
{
    public class EventTypeResolver : IEventTypeResolver
    {
        private readonly IDictionary<string, Type> _mapper;

        public EventTypeResolver(Assembly assembly)
        {
            _mapper = assembly
                .GetExportedTypes()
                .Where(x => x.Name.EndsWith("Event", StringComparison.OrdinalIgnoreCase))
                .ToDictionary(x => x.Name);
        }

        public Type GetTypeForEventName(string name)
        {
            Type eventType;
            var strippedName = name.Replace(" ", string.Empty);
            if (!_mapper.TryGetValue(strippedName, out eventType))
            {
                throw new ArgumentException($"Unable to find suitable type for event name {name}. Expected to find a type named {strippedName}Event");
            }

            return eventType;
        }
    }
}
