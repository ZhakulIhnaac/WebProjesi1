using Domain.Dto;
using System.Collections.Generic;

namespace AYCCorporate.CustomDto
{
    public class AycTenderDto
    {
        public string ProjectName { get; set; }
        public string TenderNumber { get; set; }
        public string ContractingAuthority { get; set; }
        public List<TenderPartnerDto> PartnerList { get; set; }
        public string Status { get; set; }

    }
}
