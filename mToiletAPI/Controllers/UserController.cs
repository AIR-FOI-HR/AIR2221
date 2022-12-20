using Microsoft.AspNetCore.Mvc;
using mToiletAPI.Models.Dtos.Requests;
using mToiletAPI.Models.Entities;
using mToiletAPI.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace mToiletAPI.Controllers
{
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _context;

        public UserController(UserService context)
        {
            _context = context;
        }



        [HttpGet]
        [Route("api/users")]
        public ActionResult<User> Get()
        {
            var data = _context.GetAllUsers();
            return Ok(data);
        }



        [HttpGet]
        [Route("api/users/{id}")]
        public ActionResult<User> Get([FromRoute] int id)
        {
            try
            {
                var user = _context.GetUserById(id);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        [HttpPost]
        [Route("api/users")]
        public IActionResult Create([FromBody] UserCreateRequest dto)
        {
            try
            {
                var user = _context.CreateUser(dto);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        [HttpPut]
        [Route("api/users/{id}")]
        public IActionResult Put([FromRoute] int id, [FromBody] UserCreateRequest dto)
        {
            try
            {
                _context.SaveUserById(id, dto);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        [HttpDelete]
        [Route("api/users/{id}")]
        public ActionResult<User> Delete([FromRoute] int id)
        {
            _context.DeleteUser(id);
            return Ok();
        }
    }
}
