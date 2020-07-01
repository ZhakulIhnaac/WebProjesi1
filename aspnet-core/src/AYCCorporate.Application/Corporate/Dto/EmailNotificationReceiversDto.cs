using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using AYCCorporate.Users.Dto;
using Domain.Entity;
using System;
using System.ComponentModel.DataAnnotations;

namespace Domain.Dto
{
    [AutoMap(typeof(EmailNotificationReceivers))]
    public class EmailNotificationReceiversDto : FullAuditedEntityDto<Guid>
    {
        [Required]
        public Guid EMailNotificationId { get; set; }

        [Required]
        public long UserId { get; set; }

        public EmailNotificationsDto EMailNotification { get; set; }

        public UserDto User { get; set; }
    }
}
