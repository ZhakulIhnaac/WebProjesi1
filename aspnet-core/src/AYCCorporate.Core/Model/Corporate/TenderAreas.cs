using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entity
{
    [Table("tm_tender_areas")]

    public class TenderAreas : FullAuditedEntity<Guid>
    {
        [Column("TenderId")]
        [Required]
        public Guid TenderId { get; set; }

        [Column("AreaId")]
        [Required]
        public long AreaId { get; set; }

        [ForeignKey("TenderId")]
        public Tenders Tender { get; set; }

        [ForeignKey("AreaId")]
        public WorkingAreas Area { get; set; }
    }
}