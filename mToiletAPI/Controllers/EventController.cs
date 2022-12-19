﻿using Microsoft.AspNetCore.Mvc;
using mToiletAPI.Models.Dtos.Responses;
using mToiletAPI.Models.Entities;
using mToiletAPI.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace mToiletAPI.Controllers
{
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly EventService _context;

        public EventController(EventService context)
        {
            _context= context;
        }

        [HttpGet]
        [Route("api/events")]
        public IActionResult Get()
        {
            var data = _context.GetAllEvents();
            return Ok(data);
        }

        [HttpPost]
        [Route("api/events")]
        public ActionResult<Event> Create([FromBody] EventResponse dto)
        {
            try
            {
                var events = _context.CreateEvent(dto);
                return Ok(events);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
