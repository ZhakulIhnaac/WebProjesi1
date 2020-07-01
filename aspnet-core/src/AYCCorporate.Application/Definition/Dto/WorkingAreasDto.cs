using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Domain.Entity;
using System.ComponentModel.DataAnnotations;

namespace Domain.Dto
{
    [AutoMap(typeof(WorkingAreas))]
    public class WorkingAreasDto : FullAuditedEntityDto<long>
    {
        [Required]
        public string AreaName { get; set; }
    }
}
