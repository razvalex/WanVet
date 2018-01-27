using GreenPipes;
using GreenPipes.Configurators;
using MassTransit;
using MassTransit.RabbitMqTransport;
using System;

namespace WanVet.Messaging
{
    public class BusConfigurator
    {
        private Action<IRetryConfigurator> _retryConfiguratorAction;
        private int? _tripThreshold;
        private int? _activeThreshold;
        private int? _resetInterval;
        private int? _rateLimit;
        private int? _rateLimiterInterval;


        private static readonly Lazy<BusConfigurator> _Instance = new Lazy<BusConfigurator>(() => new BusConfigurator());

        private BusConfigurator()
        {

        }

        public static BusConfigurator Instance => _Instance.Value;

        public IBusControl ConfigureBus(Action<IRabbitMqBusFactoryConfigurator, IRabbitMqHost> registrationAction = null)
        {
            return Bus.Factory.CreateUsingRabbitMq(cfg =>
            {
                var host = cfg.Host(new Uri(RabbitMQConstants.RabbitMQUri), hst =>
                {
                    hst.Username(RabbitMQConstants.RabbitMQUserName);
                    hst.Password(RabbitMQConstants.RabbitMQPassword);
                });

                UseInnerRetry(cfg);
                UseInnerCircuitBreaker(cfg);
                UseInnerRateLimiter(cfg);

                registrationAction?.Invoke(cfg, host);
            });
        }

        public BusConfigurator UseRetry(Action<IRetryConfigurator> retryConfiguratorAction)
        {
            _retryConfiguratorAction = retryConfiguratorAction;
            return this;
        }

        public BusConfigurator UseCircuitBreaker(int tripThreshold, int activeThreshold, int resetInterval)
        {
            _tripThreshold = tripThreshold;
            _activeThreshold = activeThreshold;
            _resetInterval = resetInterval;

            return this;
        }

        public BusConfigurator UseRateLimiter(int rateLimit, int interval)
        {
            _rateLimit = rateLimit;
            _rateLimiterInterval = interval;

            return this;
        }

        public void UseInnerRetry(IRabbitMqBusFactoryConfigurator cfg)
        {
            if (_retryConfiguratorAction != null)
            {
                cfg.UseRetry(_retryConfiguratorAction);
            }
        }

        public void UseInnerCircuitBreaker(IRabbitMqBusFactoryConfigurator cfg)
        {
            if (_tripThreshold != null && _activeThreshold != null && _resetInterval != null)
            {
                cfg.UseCircuitBreaker(cb =>
                {
                    cb.TripThreshold = _tripThreshold.Value;
                    cb.ActiveThreshold = _activeThreshold.Value;
                    cb.ResetInterval = TimeSpan.FromMinutes(_resetInterval.Value);
                });
            }
        }

        private void UseInnerRateLimiter(IRabbitMqBusFactoryConfigurator cfg)
        {
            if (_rateLimit != null && _rateLimiterInterval != null)
            {
                cfg.UseRateLimit(_rateLimit.Value, TimeSpan.FromSeconds(_rateLimiterInterval.Value));
            }
        }
    }
}
