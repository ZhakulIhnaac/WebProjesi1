using Abp.AutoMapper;
using Abp.Domain.Entities.Auditing;
using Domain.Entity;
using System;
using System.ComponentModel.DataAnnotations;

namespace Domain.Dto
{
    [AutoMap(typeof(TenderAreas))]
    public class TenderAreasDto : FullAuditedEntity<Guid>
    {
        [Required]
        public Guid TenderId { get; set; }

        [Required]
        public long AreaId { get; set; }

        public TendersDto Tender { get; set; }

        public WorkingAreasDto Area { get; set; }
    }
}