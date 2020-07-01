using Abp.Domain.Entities.Auditing;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entity
{
    [Table("tt_funder")]
    public class Funder : FullAuditedEntity<long>
    {
        [Column("FunderName")]
        [Required]
        public string FunderName { get; set; }
    }
}
