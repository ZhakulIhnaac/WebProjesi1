using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using AYCCorporate.CustomEntity;
using System;

namespace AYCCorporate.CustomDto
{
    [AutoMap(typeof(ShortlistResultsOfFirm))]
    public class ShortlistResultsOfFirmDto : EntityDto<Guid>
    {
        public int? TotalAwardAsLeader { get; set; }

        public int? TotalUnannouncedAsLeader { get; set; }

        public int? TotalLostAsLeader { get; set; }

        public int? TotalCancelledAsLeader { get; set; }

        public int? TotalAwardAsMember { get; set; }

        public int? TotalUnannouncedAsMember { get; set; }

        public int? TotalLostAsMember { get; set; }

        public int? TotalCancelledAsMember { get; set; }

        public int? TotalNumberAsLeader { get; set; }

        public int? TotalNumberAsMember { get; set; }

        public decimal? RatioAsLeader { get; set; }

        public decimal? RatioAsMember { get; set; }

        public int? TotalNumber { get; set; }

    }
}
