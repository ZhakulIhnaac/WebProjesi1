using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entity

{
    [Table("t_contact_channel")]

    public class ContactChannel : FullAuditedEntity<Guid>
    {
        [Column("ContactId")]
        [Required]
        public Guid ContactId { get; set; }

        [Column("ChannelTypeId")]
        [Required]
        public long ChannelTypeId { get; set; }

        [Column("ChannelContext")]
        [Required]
        public string ChannelContext { get; set; }

        [ForeignKey("ContactId")]
        public Contacts Contact { get; set; }

        [ForeignKey("ChannelTypeId")]
        public ChannelType ChannelType { get; set; }
    }
}