using System;
using System.Runtime.Serialization;

namespace WanVet.Infrastructure.Write.Domain.Exceptions
{
    [DataContract]
    public class AggregateDeletedException : AggregateException
    {
        public AggregateDeletedException(object id, Type type) : base(id, type)
        {
        }

        public AggregateDeletedException(object id, Type type, string message) : base(id, type, message)
        {
        }

        public AggregateDeletedException(object id, Type type, string message, Exception innerException) : base(id, type, message, innerException)
        {
        }
    }
}
