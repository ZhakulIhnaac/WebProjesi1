using Abp.Domain.Entities.Auditing;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entity
{
    [Table("tt_channel_type")]
    public class ChannelType : FullAuditedEntity<long>
    {
        [Column("ChannelName")]
        [Required]
        public string ChannelName { get; set; }
    }
}
