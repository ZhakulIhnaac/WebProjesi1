using Abp.Domain.Entities.Auditing;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entity
{
    [Table("tt_tender_type")]
    public class TenderType : FullAuditedEntity<long>
    {
        [Column("TypeName")]
        [Required]
        public string TypeName { get; set; }
    }
}
