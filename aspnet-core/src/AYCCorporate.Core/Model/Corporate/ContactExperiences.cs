using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entity

{
    [Table("tm_contact_experiences")]

    public class ContactExperiences : FullAuditedEntity<Guid>
    {
        [Column("ContactId")]
        [Required]
        public Guid ContactId { get; set; }

        [Column("TenderId")]
        [Required]
        public Guid TenderId { get; set; }

        [ForeignKey("ContactId")]
        public Contacts Contact { get; set; }

        [ForeignKey("TenderId")]
        public Tenders Tender { get; set; }
    }
}