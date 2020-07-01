using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entity

{
    [Table("tm_contact_firm")]

    public class ContactFirm : FullAuditedEntity<Guid>
    {
        [Column("ContactId")]
        [Required]
        public Guid ContactId { get; set; }

        [Column("FirmId")]
        [Required]
        public Guid FirmId { get; set; }

        [Column("Position")]
        [Required]
        public string Position { get; set; }

        [Column("PhoneNumber")]
        public string PhoneNumber { get; set; }

        [Column("Extension")]
        public string Extension { get; set; }

        [Column("EMail")]
        public string EMail { get; set; }

        [Column("IsActive")]
        [Required]
        public bool IsActive { get; set; }

        [Column("InactiveDate")]
        public DateTime InactiveDate { get; set; }

        [ForeignKey("ContactId")]
        public Contacts Contact { get; set; }

        [ForeignKey("FirmId")]
        public Firms Firm { get; set; }
    }
}