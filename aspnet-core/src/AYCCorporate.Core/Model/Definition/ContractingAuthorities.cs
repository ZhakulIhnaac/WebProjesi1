using Abp.Domain.Entities.Auditing;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entity
{
    [Table("tt_contracting_authorities")]
    public class ContractingAuthorities : FullAuditedEntity<long>
    {
        [Column("Name")]
        [Required]
        public string Name { get; set; }
    }
}
