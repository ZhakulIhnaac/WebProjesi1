using AYCCorporate.Users.Dto;
using Domain.Dto;
using System.Collections.Generic;

namespace AYCCorporate.CustomDto
{
    public class EmailNotificationsWithSubscribersDto
    {
        public EmailNotificationsDto EmailNotification { get; set; }
        public List<long> UserList { get; set; }
    }
}
