using System.ComponentModel.DataAnnotations;

namespace DatabaseProj.Dtos
{
    public class LoginModel
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
