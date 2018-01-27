
using WanVet.Micro.CalendarManagement.Write.Domain.Model.CalendarModel.ValueObjects;

namespace WanVet.Micro.CalendarManagement.Write.Domain.Model.CalendarModel.Events
{
    public class CalendarWorkingHoursSpecifiedEvent
    {
        public CalendarWorkingHoursSpecifiedEvent(Day day, WorkingHours workingHours)
        {
            Day = day;
            WorkingHours = workingHours;
        }

        public Day Day { get; }

        public WorkingHours WorkingHours { get; }
    }
}
