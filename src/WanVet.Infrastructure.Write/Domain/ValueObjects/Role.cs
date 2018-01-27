

namespace WanVet.Infrastructure.Write.Domain.ValueObjects
{
    public class Role : ValueObject<Role>
    {
        public Role(string name)
        {
            Name = name;
        }

        public string Name { get; }

        protected override bool EqualsCore(Role other)
        {
            return Name.Equals(other.Name);
        }

        protected override int GetHashCodeCore()
        {
            return GetHashCode();
        }
    }

    public class UserRole : Role
    {
        public UserRole() : base("User")
        {

        }
    }

    public class DoctorRole : Role
    {
        public DoctorRole() : base("Doctor")
        {

        }
    }
}
