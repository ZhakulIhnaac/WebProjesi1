using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using AYCCorporate.CustomEntity;
using System;

namespace AYCCorporate.CustomDto
{
    [AutoMap(typeof(FirmConsortiumTender))]
    public class FirmConsortiumTenderDto : EntityDto<Guid>
    {
        public Guid FirmId { get; set; }

        public double Year { get; set; }

        public string FirmName { get; set; }

        public Guid ConsortiumId { get; set; }

        public long FirmRole { get; set; }

        public string TenderNumber { get; set; }

        public string TenderName { get; set; }

        public long StatusId { get; set; }

        public Guid? AwardedConsortiumId { get; set; }

    }
}
