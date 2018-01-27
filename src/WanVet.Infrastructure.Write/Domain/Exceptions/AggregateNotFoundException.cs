using System;
using System.Runtime.Serialization;

namespace WanVet.Infrastructure.Write.Domain.Exceptions
{
    [DataContract]
    public class AggregateNotFoundException : AggregateException
    {
        public AggregateNotFoundException(object id, Type type) : base(id, type)
        {
        }

        public AggregateNotFoundException(object id, Type type, string message) : base(id, type, message)
        {
        }

        public AggregateNotFoundException(object id, Type type, string message, Exception innerException) : base(id, type, message, innerException)
        {
        }
    }
}
