using Domain.Dto;
using System.Collections.Generic;

namespace AYCCorporate.CustomDto
{
    public class AycPartnerDto
    {
        public string PartnerName { get; set; }
        public List<TendersDto> TenderList { get; set; }
        public int TenderCount { get; set; }
    }
}
