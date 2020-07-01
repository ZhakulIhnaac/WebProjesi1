using Abp.Domain.Entities;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace AYCCorporate.CustomEntity
{
    [Table("vw_shortlist_appearances")]

    public class ShortlistResultsOfFirm : Entity<Guid>
    {
        [Column("TotalAwardAsLeader")]
        public int? TotalAwardAsLeader { get; set; }

        [Column("TotalUnannouncedAsLeader")]
        public int? TotalUnannouncedAsLeader { get; set; }

        [Column("TotalLostAsLeader")]
        public int? TotalLostAsLeader { get; set; }

        [Column("TotalCancelledAsLeader")]
        public int? TotalCancelledAsLeader { get; set; }

        [Column("TotalAwardAsMember")]
        public int? TotalAwardAsMember { get; set; }

        [Column("TotalUnannouncedAsMember")]
        public int? TotalUnannouncedAsMember { get; set; }

        [Column("TotalLostAsMember")]
        public int? TotalLostAsMember { get; set; }

        [Column("TotalCancelledAsMember")]
        public int? TotalCancelledAsMember { get; set; }
    }
}