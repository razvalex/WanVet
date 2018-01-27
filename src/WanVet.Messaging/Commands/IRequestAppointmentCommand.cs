using System;
using System.Collections.Generic;
using System.Text;

namespace WanVet.Messaging.Commands
{
    public interface IRequestAppointmentCommand : ICommand
    {
        Guid CalendarId { get; set; }

        Guid PetId { get; set; }

        string PetName { get; set; }

        Guid OwnerId { get; set; }

        string OwnerFamilyName { get; set; }

        string OwnerGivenName { get; set; }

        string Date { get; set; }

        string Time { get; set; }
    }
}
