using Abp.Domain.Entities.Auditing;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entity
{
    [Table("tt_status")]
    public class Status : FullAuditedEntity<long>
    {
        [Column("StatusName")]
        [Required]
        public string StatusName { get; set; }
    }
}
