using System.Collections.Generic;

namespace AYCCorporate.CustomDto
{
    public class FirmComparisonMutualTendersDto
    {
        public List<MutualTendersComparisonDto> UnannouncedTenders { get; set; }

        public List<MutualTendersComparisonDto> FirstFirmAwardedTenders { get; set; }

        public List<MutualTendersComparisonDto> SecondFirmAwardedTenders { get; set; }

        public List<MutualTendersComparisonDto> BothLostTenders { get; set; }

        public List<MutualTendersComparisonDto> BothWonTenders { get; set; }

    }
}
