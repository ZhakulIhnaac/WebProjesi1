using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Domain.Entity;
using System;
using System.ComponentModel.DataAnnotations;

namespace Domain.Dto
{
    [AutoMap(typeof(FirmConsortium))]
    public class FirmConsortiumDto : FullAuditedEntityDto<Guid>
    {
        [Required]
        public Guid ConsortiumId { get; set; }

        [Required]
        public Guid FirmId { get; set; }

        [Required]
        public long FirmRole { get; set; }

        public FirmsDto Firm { get; set; }

        public ConsortiumsDto Consortium { get; set; }
    }
}
