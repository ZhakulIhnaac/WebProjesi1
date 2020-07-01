using Abp.Domain.Entities;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace AYCCorporate.CustomEntity
{
    [Table("vw_score_statistics_of_firms_as_member")]

    public class ScoreStatisticsOfFirmAsMember : Entity<Guid>
    {
        [Column("AvgTechnicalScoreWithNulls")]
        public float? AvgTechnicalScoreWithNulls { get; set; }

        [Column("AvgTechnicalScoreWithoutNulls")]
        public float? AvgTechnicalScoreWithoutNulls { get; set; }

        [Column("AvgFinancialScoreWithNulls")]
        public float? AvgFinancialScoreWithNulls { get; set; }

        [Column("AvgFinancialScoreWithoutNulls")]
        public float? AvgFinancialScoreWithoutNulls { get; set; }

        [Column("StDevTechnicalScoreWithNulls")]
        public float? StDevTechnicalScoreWithNulls { get; set; }

        [Column("StDevTechnicalScoreWithoutNulls")]
        public float? StDevTechnicalScoreWithoutNulls { get; set; }

        [Column("StDevFinancialScoreWithNulls")]
        public float? StDevFinancialScoreWithNulls { get; set; }

        [Column("StDevFinancialScoreWithoutNulls")]
        public float? StDevFinancialScoreWithoutNulls { get; set; }

        [Column("AvgDiscount")]
        public float? AvgDiscount { get; set; }

        [Column("StDevDiscount")]
        public float? StDevDiscount { get; set; }

        [Column("MaximumDiscount")]
        public float? MaximumDiscount { get; set; }

        [Column("MinimumDiscount")]
        public float? MinimumDiscount { get; set; }
    }
}