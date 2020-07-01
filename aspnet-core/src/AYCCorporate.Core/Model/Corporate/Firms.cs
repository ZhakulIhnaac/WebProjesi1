using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entity
{
    [Table("t_firms")]

    public class Firms : FullAuditedEntity<Guid>
    {
        [Column("Name")]
        [Required]
        public string Name { get; set; }

        [Column("CountryId")]
        [Required]
        public long CountryId { get; set; }

        [Column("Phone")]
        public string Phone { get; set; }

        [Column("Fax")]
        public string Fax { get; set; }

        [Column("EMail")]
        public string EMail { get; set; }

        [Column("Website")]
        public string Website { get; set; }

        [ForeignKey("CountryId")]
        public Countries Country { get; set; }
    }
}