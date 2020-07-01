using Abp.Domain.Entities.Auditing;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entity
{
    [Table("tt_countries")]
    public class Countries : FullAuditedEntity<long>
    {
        [Column("CountryName")]
        [Required]
        public string CountryName { get; set; }
    }
}
