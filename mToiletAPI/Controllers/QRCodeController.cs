using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using mToiletAPI.Models.Dtos.Requests;
using mToiletAPI.Models.Entities;
using mToiletAPI.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace mToiletAPI.Controllers
{
    [ApiController]
    public class QRCodeController : ControllerBase
    {
        private readonly QRCodeService _context;

        public QRCodeController(QRCodeService context)
        {
            _context = context;
        }

        [EnableCors]
        [HttpGet]
        [Route("api/qrcodes")]

        public ActionResult<QRCode> Get()
        {
            var data = _context.GetAllCodes();
            return Ok(data);
        }

        [EnableCors]
        [HttpGet]
        [Route("api/qrcodes/{id}")]
        public ActionResult<QRCode> Get([FromRoute] int id)
        {
            try
            {
                var device = _context.GetCodeById(id);
                return Ok(device);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [EnableCors]
        [HttpPost]
        [Route("api/qrcodes")]
        public IActionResult Create([FromBody] QRCodeCreateRequest dto)
        {
            try
            {
                var device = _context.CreateCode(dto);
                return Ok(device);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [EnableCors]
        [HttpPut]
        [Route("api/qrcodes/{id}")]
        public ActionResult<QRCode> Put([FromRoute] int id, [FromBody] QRCodeCreateRequest dto)
        {
            try
            {
                _context.SaveCodeById(id, dto);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [EnableCors]
        [HttpDelete]
        [Route("api/qrcodes/{id}")]
        public ActionResult<QRCode> Delete([FromRoute] int id)
        {
            _context.DeleteCode(id);
            return Ok();
        }
    }
}
