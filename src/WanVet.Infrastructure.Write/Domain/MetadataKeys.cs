
namespace WanVet.Infrastructure.Write.Domain
{
    public static class MetadataKeys
    {
        public static readonly string EventClrTypeHeader = "EventClrTypeName";
        public static readonly string AggregateClrTypeHeader = "AggregateClrTypeName";
        public static readonly string CommitIdHeader = "CommitId";
        public static readonly string ServerClockHeader = "ServerClock";
    }
}
