using System;

namespace WanVet.Infrastructure.Read
{
    public class QueryBus : IQueryBus
    {
        private readonly Func<Type, Type, IQueryHandler> _qHandlersFactory;

        public QueryBus(Func<Type, Type, IQueryHandler> qHandlersFactory)
        {
            _qHandlersFactory = qHandlersFactory;
        }

        public TResult Execute<TQuery, TResult>(TQuery query) where TQuery : IQuery<TResult>
        {
            var qHandler = (IQueryHandler<TQuery, TResult>)_qHandlersFactory(typeof(TQuery), typeof(TResult));
            return qHandler.Handle(query);
        }
    }
}
