using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AuokkaAdmin.Models;

namespace AuokkaAdmin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SchedulesController : ControllerBase
    {
        private readonly AuokkaContext _context;

        public SchedulesController(AuokkaContext context)
        {
            _context = context;
        }

        // GET: api/Schedules
        [HttpGet]
        public IEnumerable<Schedule> GetSchedule()
        {
            return _context.Schedule;
        }

        // GET: api/Schedules/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSchedule([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var schedule = await _context.Schedule.FindAsync(id);

            if (schedule == null)
            {
                return NotFound();
            }

            return Ok(schedule);
        }

        // PUT: api/Schedules/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSchedule([FromRoute] int id, [FromBody] Schedule schedule)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != schedule.Id)
            {
                return BadRequest();
            }

            _context.Entry(schedule).Property(s => s.From).IsModified = true;
            _context.Entry(schedule).Property(s => s.To).IsModified = true;
            _context.Entry(schedule).Property(s => s.Active).IsModified = true;
            _context.Entry(schedule).Property(s => s.Location).IsModified = true;
            _context.Entry(schedule.DefaultPrice).Property(p => p.Amount).IsModified = true;
            schedule.UpdateTime = DateTime.Now;
            schedule.DefaultPrice.UpdateTime = DateTime.Now;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ScheduleExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            var output = new
            {
                schedule.DefaultPrice,
                schedule.Id,
                schedule.Location,
                schedule.Active,
                schedule.From,
                schedule.To
            };
            return Ok(output);
        }

        // POST: api/Schedules
        [HttpPost]
        public async Task<IActionResult> PostSchedule([FromBody] Schedule schedule)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            schedule.Course = null;
            _context.Schedule.Add(schedule);
            await _context.SaveChangesAsync();
            var output = new
            {
                schedule.DefaultPrice,
                schedule.Id,
                schedule.Location,
                schedule.Active,
                schedule.From,
                schedule.To
            };
            return Ok(output);
        }

        // DELETE: api/Schedules/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSchedule([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var schedule = await _context.Schedule.FindAsync(id);
            if (schedule == null)
            {
                return NotFound();
            }

            //_context.Schedule.Remove(schedule);
            await _context.SaveChangesAsync();

            return Ok(schedule);
        }

        [HttpPut("active/{id}")]
        public async Task<ActionResult> ToggleActive([FromRoute] int id, [FromBody] Schedule s)
        {
            _context.Entry(s).Property(schedule => schedule.Active).IsModified = true;
            await _context.SaveChangesAsync();
            return Ok();

        }

        private bool ScheduleExists(int id)
        {
            return _context.Schedule.Any(e => e.Id == id);
        }
    }
}