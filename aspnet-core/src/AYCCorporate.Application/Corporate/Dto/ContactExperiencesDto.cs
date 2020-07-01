using Abp.AutoMapper;
using Abp.Domain.Entities.Auditing;
using Domain.Entity;
using System;
using System.ComponentModel.DataAnnotations;

namespace Domain.Dto
{
    [AutoMap(typeof(ContactExperiences))]
    public class ContactExperiencesDto : FullAuditedEntity<Guid>
    {
        [Required]
        public Guid ContactId { get; set; }

        [Required]
        public Guid TenderId { get; set; }

        public ContactsDto Contact { get; set; }

        public TendersDto Tender { get; set; }
    }
}