using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Data;
using WebApplication1.Model.Dto;
using WebApplication1.Model.Entity;


namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class userController : ControllerBase
    {
        private AppDbContext dbContext;

        public userController(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetUsers()
        {
            if (dbContext.Users == null)
            {
                return NotFound("No users found.");
            }
            var users = dbContext.Users.ToList();
            return Ok(users);
        }

        [HttpPost]

        public IActionResult CreateUser(AddUserDto adduserDto)
        {
            if (adduserDto == null) return BadRequest();

            var newUser = new User()
            {
                Id = adduserDto.Id,
                Name = adduserDto.Name,
                Email = adduserDto.Email,
                Age = adduserDto.Age,
            };
            dbContext.Users.Add(newUser);
            dbContext.SaveChanges();

            return CreatedAtAction(nameof(GetUsers), null, newUser);

        }

        [HttpPut("{id}")]
        public IActionResult UpdateUser(int id, AddUserDto updateUserDto)
        {
            var existingUser = dbContext.Users.Find(id);
            if (existingUser == null)
            {
                return NotFound($"User with ID {id} not found.");
            }
            existingUser.Name = updateUserDto.Name;
            existingUser.Email = updateUserDto.Email;
            existingUser.Age = updateUserDto.Age;
            dbContext.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id) { 
            var existingUser = dbContext.Users.Find(id);
            if (existingUser == null)
            {
                return NotFound($"User with ID {id} not found.");
            }
            dbContext.Users.Remove(existingUser);
            dbContext.SaveChanges();
            return NoContent();
        }

        [HttpGet("search")]
        public IActionResult SearchUsers(string keyword)
        {
            if (string.IsNullOrWhiteSpace(keyword))
                return BadRequest("Search keyword is required.");

            var users = dbContext.Users
                .Where(u => u.Name.Contains(keyword) || u.Email.Contains(keyword))
                .ToList();

            return Ok(users);
        }

    }
}
