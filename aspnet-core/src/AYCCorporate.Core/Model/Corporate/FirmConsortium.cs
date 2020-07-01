using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entity

{
    [Table("tm_firm_consortium")]

    public class FirmConsortium : FullAuditedEntity<Guid>
    {
        [Column("FirmId")]
        [Required]
        public Guid FirmId { get; set; }

        [Column("ConsortiumId")]
        [Required]
        public Guid ConsortiumId { get; set; }

        [Column("FirmRole")]
        [Required]
        public long FirmRole { get; set; }

        [Column("FirmId")]
        public Firms Firm { get; set; }

        [Column("ConsortiumId")]
        public Consortiums Consortium { get; set; }
    }
}