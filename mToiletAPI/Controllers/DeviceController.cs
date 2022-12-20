using Microsoft.AspNetCore.Mvc;
using mToiletAPI.Models.Dtos.Requests;
using mToiletAPI.Models.Entities;
using mToiletAPI.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace mToiletAPI.Controllers
{
    [ApiController]
    public class DeviceController : ControllerBase
    {
        private readonly DeviceService _context;

        public DeviceController(DeviceService context)
        {
            _context = context;
        }



        [HttpGet]
        [Route("api/devices")]
        public ActionResult<Device> Get()
        {
            var data = _context.GetAllDevices();
            return Ok(data);
        }



        [HttpGet]
        [Route("api/devices/{id}")]
        public ActionResult<Device> Get([FromRoute] int id)
        {
            try
            {
                var device = _context.GetDeviceById(id);
                return Ok(device);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        [HttpPost]
        [Route("api/devices")]
        public IActionResult Create([FromBody] DeviceCreateRequest dto)
        {
            try
            {
                var device = _context.CreateDevice(dto);
                return Ok(device);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        [HttpPut]
        [Route("api/devices/{id}")]
        public ActionResult<Device> Put([FromRoute] int id, [FromBody] DeviceCreateRequest dto)
        {
            try
            {
                _context.SaveDeviceById(id, dto);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        [HttpDelete]
        [Route("api/devices/{id}")]
        public ActionResult<Device> Delete([FromRoute] int id)
        {
            _context.DeleteDevice(id);
            return Ok();
        }
    }
}
