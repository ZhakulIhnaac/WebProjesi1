using Domain.Dto;
using System.Collections.Generic;

namespace AYCCorporate.CustomDto
{
    public class FirmYearlyResultDto
    {
        public int Year { get; set; }
        public int AwardedCount { get; set; }
        public int LostCount { get; set; }
        public int UnannouncedCount { get; set; }
        public int CancelledCount { get; set; }
        public int TotalCount { get; set; }

    }
}
