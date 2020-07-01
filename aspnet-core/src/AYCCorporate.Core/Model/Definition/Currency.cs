using Abp.Domain.Entities.Auditing;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entity
{
    [Table("tt_currency")]
    public class Currency : FullAuditedEntity<long>
    {
        [Column("CurrencyCode")]
        [Required]
        public string CurrencyCode { get; set; }

        [Column("CurrencyName")]
        [Required]
        public string CurrencyName { get; set; }
    }
}
