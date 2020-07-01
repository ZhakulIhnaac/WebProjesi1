using Abp.AutoMapper;
using Abp.Domain.Entities.Auditing;
using Domain.Entity;
using System;
using System.ComponentModel.DataAnnotations;

namespace Domain.Dto
{
    [AutoMap(typeof(ContactAreas))]
    public class ContactAreasDto : FullAuditedEntity<Guid>
    {
        [Required]
        public Guid ContactId { get; set; }

        [Required]
        public long AreaId { get; set; }

        public ContactsDto Contact { get; set; }

        public WorkingAreasDto Area { get; set; }
    }
}