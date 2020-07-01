using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Domain.Entity;
using System.ComponentModel.DataAnnotations;

namespace Domain.Dto
{
    [AutoMap(typeof(ContractingAuthorities))]
    public class ContractingAuthoritiesDto : FullAuditedEntityDto<int>
    {
        [Required]
        public string Name { get; set; }
    }
}
