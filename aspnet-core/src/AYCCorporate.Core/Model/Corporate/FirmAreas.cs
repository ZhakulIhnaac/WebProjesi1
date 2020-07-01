using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entity

{
    [Table("tm_firm_areas")]

    public class FirmAreas : FullAuditedEntity<Guid>
    {
        [Column("FirmId")]
        [Required]
        public Guid FirmId { get; set; }

        [Column("AreaId")]
        [Required]
        public long AreaId { get; set; }

        [Column("TenderId")]
        public Guid TenderId { get; set; }

        [ForeignKey("FirmId")]
        public Firms Firm { get; set; }

        [ForeignKey("AreaId")]
        public WorkingAreas Area { get; set; }
    }
}