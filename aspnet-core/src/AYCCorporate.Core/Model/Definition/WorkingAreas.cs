using Abp.Domain.Entities.Auditing;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entity
{
    [Table("tt_working_areas")]
    public class WorkingAreas : FullAuditedEntity<long>
    {
        [Column("AreaName")]
        [Required]
        public string AreaName { get; set; }
    }
}
