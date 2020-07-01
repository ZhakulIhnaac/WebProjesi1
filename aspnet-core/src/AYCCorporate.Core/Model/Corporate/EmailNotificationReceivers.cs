using Abp.Domain.Entities.Auditing;
using AYCCorporate.Authorization.Users;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entity

{
    [Table("tm_email_notification_receivers")]

    public class EmailNotificationReceivers : FullAuditedEntity<Guid>
    {
        [Column("EMailNotificationId")]
        [Required]
        public Guid EMailNotificationId { get; set; }

        [Column("UserId")]
        [Required]
        public long UserId { get; set; }

        [ForeignKey("EMailNotificationId")]
        public EmailNotifications EMailNotification { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }
    }
}