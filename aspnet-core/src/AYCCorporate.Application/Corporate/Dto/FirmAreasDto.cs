using Abp.AutoMapper;
using Abp.Domain.Entities.Auditing;
using Domain.Entity;
using System;
using System.ComponentModel.DataAnnotations;

namespace Domain.Dto
{
    [AutoMap(typeof(FirmAreas))]
    public class FirmAreasDto : FullAuditedEntity<Guid>
    {
        [Required]
        public Guid FirmId { get; set; }

        [Required]
        public long AreaId { get; set; }

        public Guid TenderId { get; set; }

        public FirmsDto Firm { get; set; }

        public WorkingAreasDto Area { get; set; }
    }
}