
using WanVet.Infrastructure.Write.Domain;

namespace WanVet.Micro.CalendarManagement.Write.Domain.Model.CalendarModel.ValueObjects
{
    public class Day : ValueObject<Day>
    {
        public Day(string name)
        {
            Name = name;
        }

        public string Name { get; }

        protected override bool EqualsCore(Day other)
        {
            return Name.Equals(other.Name);
        }

        protected override int GetHashCodeCore()
        {
            return GetHashCode();
        }
    }

    public class Monday : Day
    {
        public Monday() : base("Monday") { }
    }

    public class Tuesday : Day
    {
        public Tuesday() : base("Tuesday") { }
    }

    public class Wednesday : Day
    {
        public Wednesday() : base("Wednesday") { }
    }
    public class Thursday : Day
    {
        public Thursday() : base("Thursday") { }
    }
    public class Friday : Day
    {
        public Friday() : base("Friday") { }
    }
    public class Saturday : Day
    {
        public Saturday() : base("Saturday") { }
    }
    public class Sunday : Day
    {
        public Sunday() : base("Sunday") { }
    }
}
