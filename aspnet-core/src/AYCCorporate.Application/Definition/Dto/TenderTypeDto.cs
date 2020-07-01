using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Domain.Entity;
using System.ComponentModel.DataAnnotations;

namespace Domain.Dto
{
    [AutoMap(typeof(TenderType))]
    public class TenderTypeDto : FullAuditedEntityDto<long>
    {
        [Required]
        public string TypeName { get; set; }
    }
}
