using Abp.Domain.Entities;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace AYCCorporate.CustomEntity
{
    [Table("vw_firm_consortium_tender")]

    public class FirmConsortiumTender : Entity<Guid>
    {
        [Column("FirmId")]
        public Guid FirmId { get; set; }

        [Column("Year")]
        public double Year { get; set; }

        [Column("FirmName")]
        public string FirmName { get; set; }

        [Column("ConsortiumId")]
        public Guid ConsortiumId { get; set; }

        [Column("FirmRole")]
        public long FirmRole { get; set; }

        [Column("TenderNumber")]
        public string TenderNumber { get; set; }

        [Column("TenderName")]
        public string TenderName { get; set; }

        [Column("StatusId")]
        public long StatusId { get; set; }

        [Column("AwardedConsortiumId")]
        public Guid? AwardedConsortiumId { get; set; }
    }
}