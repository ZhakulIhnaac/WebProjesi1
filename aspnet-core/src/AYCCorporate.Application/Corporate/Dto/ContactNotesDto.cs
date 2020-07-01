using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using AYCCorporate.Users.Dto;
using Domain.Entity;
using System;
using System.ComponentModel.DataAnnotations;

namespace Domain.Dto
{
    [AutoMap(typeof(ContactNotes))]
    public class ContactNotesDto : FullAuditedEntityDto<Guid>
    {

        [Required]
        public Guid ContactId { get; set; }
        
        [Required]
        public string Note { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public long UserId { get; set; }

        [Required]
        public string MeetingType { get; set; }

        public DateTime? MeetingDate { get; set; }
        
        public ContactsDto Contact { get; set; }

        public UserDto User { get; set; }

    }
}
