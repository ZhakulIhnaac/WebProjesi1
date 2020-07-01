using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entity
{
    [Table("t_tenders")]
    
    public class Tenders : FullAuditedEntity<Guid>
    {
        [Column("Title")]
        [Required]
        public string Title { get; set; }

        [Column("TypeId")]
        [Required]
        public long TypeId { get; set; }

        [Column("ContractingAuthorityId")]
        [Required]
        public long ContractingAuthorityId { get; set; }

        [Column("LocationId")]
        [Required]
        public long LocationId { get; set; }

        [Column("MaximumBudget")]
        public long? MaximumBudget { get; set; }

        [Column("CurrencyId")]
        [Required]
        public long CurrencyId { get; set; }

        [Column("Deadline")]
        public DateTime? Deadline { get; set; }

        [Column("ForecastDate")]
        [Required]
        public DateTime ForecastDate { get; set; }

        [Column("OpeningDate")]
        public DateTime? OpeningDate { get; set; }

        [Column("ClosingDate")]
        public DateTime? ClosingDate { get; set; }

        [Column("ShortlistDate")]
        public DateTime? ShortlistDate { get; set; }

        [Column("AwardingDate")]
        public DateTime? AwardingDate { get; set; }

        [Column("CancellationDate")]
        public DateTime? CancellationDate { get; set; }

        [Column("StatusId")]
        [Required]
        public long StatusId { get; set; }

        [Column("AwardedConsortiumId")]
        public Guid? AwardedConsortiumId { get; set; }

        [Column("AwardedPrice")]
        public long? AwardedPrice { get; set; }

        [Column("AwardedTechnicalScore")]
        public float? AwardedTechnicalScore { get; set; }

        [Column("AwardedFinancialScore")]
        public float? AwardedFinancialScore { get; set; }

        [Column("AwardedTotalScore")]
        public float? AwardedTotalScore { get; set; }

        [Column("Duration")]
        public long? Duration { get; set; }

        [Column("Description")]
        public string Description { get; set; }

        [Column("Criterias")]
        public string Criterias { get; set; }

        [Column("TenderNumber")]
        [Required]
        public string TenderNumber { get; set; }

        [Column("ShortlistDeadlineDate")]
        public DateTime? ShortlistDeadlineDate { get; set; }

        [ForeignKey("StatusId")]
        public Status Status { get; set; }
        
        [ForeignKey("ContractingAuthorityId")]
        public ContractingAuthorities ContractingAuthority { get; set; }

        [ForeignKey("TypeId")]
        public TenderType Type { get; set; }

        [ForeignKey("LocationId")]
        public Countries Location { get; set; }

        [ForeignKey("CurrencyId")]
        public Currency Currency { get; set; }

    }
}