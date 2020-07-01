using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entity

{
    [Table("t_consortiums")]

    public class Consortiums : FullAuditedEntity<Guid>
    {
        [Column("TenderId")]
        [Required]
        public Guid TenderId { get; set; }

        [ForeignKey("TenderId")]
        public Tenders Tender { get; set; }
    }
}