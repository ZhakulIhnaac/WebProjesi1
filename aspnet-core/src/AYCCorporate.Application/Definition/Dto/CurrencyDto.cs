using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Domain.Entity;
using System.ComponentModel.DataAnnotations;

namespace Domain.Dto
{
    [AutoMap(typeof(Currency))]
    public class CurrencyDto : FullAuditedEntityDto<long>
    {
        [Required]
        public string CurrencyCode { get; set; }

        [Required]
        public string CurrencyName { get; set; }
    }
}
