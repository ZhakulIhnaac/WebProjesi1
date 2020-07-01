using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entity

{
    [Table("t_contact")]

    public class Contacts : FullAuditedEntity<Guid>
    {
        [Column("Sex")]
        [Required]
        public string Sex { get; set; }

        [Column("Title")]
        public string Title { get; set; }

        [Column("Name")]
        [Required]
        public string Name { get; set; }

        [Column("Surname")]
        [Required]
        public string Surname { get; set; }

        [Column("NationalityId")]
        [Required]
        public long NationalityId { get; set; }

        [ForeignKey("NationalityId")]
        public Countries Nationality { get; set; }
    }
}