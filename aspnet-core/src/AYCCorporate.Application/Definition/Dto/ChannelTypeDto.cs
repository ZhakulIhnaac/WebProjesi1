using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Domain.Entity;
using System.ComponentModel.DataAnnotations;

namespace Domain.Dto
{
    [AutoMap(typeof(ChannelType))]
    public class ChannelTypeDto : FullAuditedEntityDto<long>
    {
        [Required]
        public string ChannelName { get; set; }
    }
}
