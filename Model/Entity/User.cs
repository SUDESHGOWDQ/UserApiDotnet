using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Model.Entity
{
    public class User
    {

        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }

        public int Age { get; set; }

    }
}
