
using System;
using System.Threading.Tasks;
using MassTransit;

namespace WanVet.Messaging
{
    public static class BusExtensions
    {
        public static Task<ISendEndpoint> GetSendEndpoint(this IBus bus, string queue)
        {
            return bus.GetSendEndpoint(new Uri($"{bus.Address.GetBaseUri()}/{queue}"));
        }

        public static string GetBaseUri(this Uri uri)
        {
            return uri.GetComponents(UriComponents.Scheme | UriComponents.Path | UriComponents.StrongAuthority, UriFormat.Unescaped).Replace("/ignore", string.Empty);
        }
    }
}
