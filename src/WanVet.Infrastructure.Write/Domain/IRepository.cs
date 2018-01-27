
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WanVet.Infrastructure.Write.Domain
{
    public interface IRepository
    {
        Task<TAggregate> GetById<TAggregate>(object id) where TAggregate : IAggregate, new();
        Task<long> SaveAsync(Aggregate aggregate, params KeyValuePair<string, string>[] extraHeaders);
    }
}
