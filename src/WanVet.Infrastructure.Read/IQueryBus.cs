namespace WanVet.Infrastructure.Read
{
    public interface IQueryBus
    {
        TResult Execute<TQuery, TResult>(TQuery query)
            where TQuery : IQuery<TResult>;
    }
}
