using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Domain.Dto;
using Domain.Entity;
using System;
using System.ComponentModel.DataAnnotations;

namespace AYCCorporate.CustomDto
{
    public class OldTendersOfFirmDto
    {
        public int? Year { get; set; }
        
        public string TenderNumber { get; set; }

        public string Title { get; set; }

        public float? TechnicalScore { get; set; }

        public float? FinancialScore { get; set; }

        public float? TotalScore { get; set; }

        public long? MaximumBudget { get; set; }

        public string Currency { get; set; }

        public long? AwardedPrice { get; set; }

        public float? Discount { get; set; }

        public string Role { get; set; }

        public string Result { get; set; }

    }
}
