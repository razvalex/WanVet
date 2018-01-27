using System;
using System.Runtime.Serialization;

namespace WanVet.Infrastructure.Write.Domain.Exceptions
{
    [DataContract]
    public abstract class AggregateException : Exception
    {
        protected AggregateException(object id, Type type)
        {
            Id = id;
            Type = type;
        }

        protected AggregateException(object id, Type type, string message) : base(message)
        {
            Id = id;
            Type = type;
        }

        protected AggregateException(object id, Type type, string message, Exception innerException)
            : base(message, innerException)
        {
            Id = id;
            Type = type;
        }

        public object Id { get; }

        public Type Type { get; }
    }
}
