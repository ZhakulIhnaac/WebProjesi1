using System.ComponentModel.DataAnnotations;

namespace AYCCorporate.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}