using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Domain.Entity;
using System.ComponentModel.DataAnnotations;

namespace Domain.Dto
{
    [AutoMap(typeof(Status))]
    public class StatusDto : FullAuditedEntityDto<long>
    {
        [Required]
        public string StatusName { get; set; }
    }
}
