using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entity

{
    [Table("t_email_notifications")]

    public class EmailNotifications : FullAuditedEntity<Guid>
    {
        [Column("Name")]
        [Required]
        [MaxLength(64)]
        public string Name { get; set; }

        [Column("Description")]
        [Required]
        [MaxLength(128)]
        public string Description { get; set; }
    }
}