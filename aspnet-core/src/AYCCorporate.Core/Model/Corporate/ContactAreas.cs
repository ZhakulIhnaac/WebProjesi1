using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entity

{
    [Table("tm_contact_areas")]

    public class ContactAreas : FullAuditedEntity<Guid>
    {
        [Column("ContactId")]
        [Required]
        public Guid ContactId { get; set; }

        [Column("AreaId")]
        [Required]
        public long AreaId { get; set; }

        [ForeignKey("ContactId")]
        public Contacts Contact { get; set; }

        [ForeignKey("AreaId")]
        public WorkingAreas Area { get; set; }
    }
}