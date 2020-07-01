using Abp.AutoMapper;
using Abp.Domain.Entities.Auditing;
using Domain.Entity;
using System;
using System.ComponentModel.DataAnnotations;

namespace Domain.Dto
{
    [AutoMap(typeof(ContactFirm))]
    public class ContactFirmDto : FullAuditedEntity<Guid>
    {
        [Required]
        public Guid ContactId { get; set; }

        [Required]
        public Guid FirmId { get; set; }

        [Required]
        public string Position { get; set; }

        public string PhoneNumber { get; set; }

        public string Extension { get; set; }

        public string EMail { get; set; }

        [Required]
        public bool IsActive { get; set; }

        public DateTime InactiveDate { get; set; }

        public ContactsDto Contact { get; set; }

        public FirmsDto Firm { get; set; }
    }
}