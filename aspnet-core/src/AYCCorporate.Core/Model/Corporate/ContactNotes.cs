using Abp.Domain.Entities.Auditing;
using AYCCorporate.Authorization.Users;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entity

{
    [Table("t_contact_notes")]

    public class ContactNotes : FullAuditedEntity<Guid>
    {
        [Column("ContactId")]
        [Required]
        public Guid ContactId { get; set; }

        [Column("Note")]
        [Required]
        public string Note { get; set; }

        [Column("Title")]
        [Required]
        public string Title { get; set; }

        [Column("UserId")]
        [Required]
        public long UserId { get; set; }

        [Column("MeetingType")]
        [Required]
        public string MeetingType { get; set; }

        [Column("MeetingDate")]
        public DateTime? MeetingDate { get; set; }

        [ForeignKey("ContactId")]
        public Contacts Contact { get; set; }
        
        [ForeignKey("UserId")]
        public User User { get; set; }
    }
}