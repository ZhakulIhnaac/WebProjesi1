using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Domain.Entity;
using System;
using System.ComponentModel.DataAnnotations;

namespace Domain.Dto
{
    [AutoMap(typeof(Firms))]
    public class FirmsDto : FullAuditedEntityDto<Guid>
    {
        [Required]
        public string Name { get; set; }
        
        [Required]
        public long CountryId { get; set; }

        public string Phone { get; set; }

        public string Fax { get; set; }

        public string EMail { get; set; }

        public string Website { get; set; }

        public CountriesDto Country { get; set; }

    }
}
