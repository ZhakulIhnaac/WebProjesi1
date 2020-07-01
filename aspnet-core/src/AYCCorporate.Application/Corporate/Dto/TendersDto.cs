using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Domain.Entity;
using System;
using System.ComponentModel.DataAnnotations;

namespace Domain.Dto
{
    [AutoMap(typeof(Tenders))]
    public class TendersDto : FullAuditedEntityDto<Guid>
    {
        [Required]
        public string Title { get; set; }
        
        [Required]
        public long TypeId { get; set; }

        [Required]
        public long ContractingAuthorityId { get; set; }

        [Required]
        public long LocationId { get; set; }

        public long? MaximumBudget { get; set; }

        [Required]
        public long CurrencyId { get; set; }

        public DateTime? Deadline { get; set; }

        [Required]
        public DateTime ForecastDate { get; set; }

        public DateTime? OpeningDate { get; set; }

        public DateTime? ClosingDate { get; set; }

        public DateTime? ShortlistDate { get; set; }

        public DateTime? AwardingDate { get; set; }

        public DateTime? CancellationDate { get; set; }

        [Required]
        public long StatusId { get; set; }

        public Guid? AwardedConsortiumId { get; set; }

        public long? AwardedPrice { get; set; }

        public float? AwardedTechnicalScore { get; set; }

        public float? AwardedFinancialScore { get; set; }

        public float? AwardedTotalScore { get; set; }

        public long? Duration { get; set; }

        public string Description { get; set; }

        public string Criterias { get; set; }

        [Required]
        public string TenderNumber { get; set; }

        public DateTime? ShortlistDeadlineDate { get; set; }

        public StatusDto Status { get; set; }

        public TenderTypeDto Type { get; set; }

        public CountriesDto Location { get; set; }

        public CurrencyDto Currency { get; set; }

        public ContractingAuthoritiesDto ContractingAuthority { get; set; }

    }
}
