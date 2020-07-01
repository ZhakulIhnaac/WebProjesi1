using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Domain.Entity;
using System;
using System.ComponentModel.DataAnnotations;

namespace Domain.Dto
{
    [AutoMap(typeof(ContactChannel))]
    public class ContactChannelDto : FullAuditedEntityDto<Guid>
    {
        [Required]
        public Guid ContactId { get; set; }

        [Required]
        public long ChannelTypeId { get; set; }

        [Required]
        public string ChannelContext { get; set; }

        public ContactsDto Contact { get; set; }

        public ChannelTypeDto ChannelType { get; set; }
    }
}
