
using WanVet.Infrastructure.Write.Domain;

namespace WanVet.Micro.CalendarManagement.Write.Domain.Model.CalendarModel.ValueObjects
{
    public class WorkingHours : ValueObject<WorkingHours>
    {
        public WorkingHours(int start, int end)
        {
            Start = start;
            End = end;
        }

        public int Start { get; }

        public int End { get; }

        protected override bool EqualsCore(WorkingHours other)
        {
            return Start.Equals(other.Start) && End.Equals(other.End);
        }

        protected override int GetHashCodeCore()
        {
            return GetHashCode();
        }
    }

    public class NineToFiveWorkingHours : WorkingHours
    {
        public NineToFiveWorkingHours() : base(9, 17)
        {
        }
    }

    public class NineToTwelveWorkingHours : WorkingHours
    {
        public NineToTwelveWorkingHours() : base(9, 12)
        {
        }
    }
}
