
namespace WanVet.Messaging
{
    public static class RabbitMQConstants
    {
        public const string RabbitMQUri = "rabbitmq://localhost/wanvet/";
        public const string RabbitMQUserName = "guest";
        public const string RabbitMQPassword = "guest";
        public const string UserManagementReadQueue = "domains.usermanagement.read.queue";
        public const string UserManagementWriteQueue = "domains.usermanagement.write.queue";
        public const string PetManagementReadQueue = "domains.petmanagement.read.queue";
        public const string PetManagementWriteQueue = "domains.petmanagement.write.queue";
        public const string CalendarManagementReadQueue = "domains.calendarmanagement.read.queue";
        public const string CalendarManagementWriteQueue = "domains.calendarmanagement.write.queue";
        public const string AppointmentManagementReadQueue = "domains.appointmentmanagement.read.queue";
        public const string AppointmentManagementWriteQueue = "domains.appointmentmanagement.write.queue";

    }
}
