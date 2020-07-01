using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using AYCCorporate.CustomEntity;
using System;

namespace AYCCorporate.CustomDto
{
    [AutoMap(typeof(ScoreStatisticsOfFirmAsLeader))]
    public class ScoreStatisticsOfFirmAsLeaderDto : EntityDto<Guid>
    {
        public float? AvgTechnicalScoreWithNulls { get; set; }

        public float? AvgTechnicalScoreWithoutNulls { get; set; }

        public float? AvgFinancialScoreWithNulls { get; set; }

        public float? AvgFinancialScoreWithoutNulls { get; set; }

        public float? StDevTechnicalScoreWithNulls { get; set; }

        public float? StDevTechnicalScoreWithoutNulls { get; set; }

        public float? StDevFinancialScoreWithNulls { get; set; }

        public float? StDevFinancialScoreWithoutNulls { get; set; }

        public float? AvgDiscount { get; set; }

        public float? StDevDiscount { get; set; }

        public float? MaximumDiscount { get; set; }

        public float? MinimumDiscount { get; set; }

    }
}
