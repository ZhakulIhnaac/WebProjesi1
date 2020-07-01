using Domain.Dto;
using System.Collections.Generic;

namespace AYCCorporate.CustomDto
{
    public class TenderStatusCountDto
    {
        public long Forecasted { get; set; }
        public long Opened { get; set; }
        public long Closed { get; set; }
        public long Shortlisted { get; set; }
        public long Awarded { get; set; }
        public long Cancelled { get; set; }

    }
}
