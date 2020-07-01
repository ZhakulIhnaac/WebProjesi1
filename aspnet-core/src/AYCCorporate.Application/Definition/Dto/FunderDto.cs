using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Domain.Entity;
using System.ComponentModel.DataAnnotations;

namespace Domain.Dto
{
    [AutoMap(typeof(Funder))]
    public class FunderDto : FullAuditedEntityDto<long>
    {
        [Required]
        public string FunderName { get; set; }
    }
}
