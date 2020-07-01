using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Domain.Entity;
using System;
using System.ComponentModel.DataAnnotations;

namespace Domain.Dto
{
    [AutoMap(typeof(Consortiums))]
    public class ConsortiumsDto : FullAuditedEntityDto<Guid>
    {
        [Required]
        public Guid TenderId { get; set; }

        public TendersDto Tender { get; set; }
    }
}
