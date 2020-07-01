using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Domain.Entity;
using System;
using System.ComponentModel.DataAnnotations;

namespace Domain.Dto
{
    [AutoMap(typeof(Contacts))]
    public class ContactsDto : FullAuditedEntityDto<Guid>
    {
        [Required]
        public string Sex { get; set; }

        public string Title { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Surname { get; set; }

        [Required]
        public long NationalityId { get; set; }

        public CountriesDto Nationality { get; set; }
    }
}