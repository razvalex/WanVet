

namespace WanVet.Infrastructure.Write.Domain.ValueObjects
{
    public class AppointmentState : ValueObject<AppointmentState>
    {
        public AppointmentState(string name)
        {
            Name = name;
        }

        public string Name { get; }

        protected override bool EqualsCore(AppointmentState other)
        {
            return Name.Equals(other.Name);
        }

        protected override int GetHashCodeCore()
        {
            return GetHashCode();
        }
    }

    public class Open : AppointmentState
    {
        public Open() : base("Open") { }
    }

    public class Completed : AppointmentState
    {
        public Completed() : base("Completed") { }
    }
}
