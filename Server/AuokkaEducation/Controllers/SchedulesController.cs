using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AuokkaEducation.Models;
using AuokkaEducation.Utility;

namespace AuokkaEducation.Controllers
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

        // GET: api/Schedules/list/10
        [HttpGet("list/{offset}/{fetchSize}")]
        public ObjectResult GetScheduleList([FromRoute] int offset, [FromRoute] int fetchSize = 20)
        {

            var schedules = _context.Schedule
                    .Include(s => s.Course)
                    .Include(s => s.DefaultPrice)
                    .Where(s => s.Active == 1 && s.Deleted == 0)
                    .Select(s => new 
                    {
                        Id = s.CourseId,
                        Name = s.Course.Name,
                        Image = s.Course.Image,
                        Description = s.Course.Description,
                        Level = s.Course.Level,
                        Duration = s.Duration,
                        FromYear = ((DateTime)s.From).Year,
                        FromMonth = ((DateTime)s.From).Month,
                        Location = s.Location,
                        DefaultPrice = s.DefaultPrice
                    }).ToList();

            var courseInfo = (from s in schedules
                              group s by new { Id = s.Id, Year = s.FromYear, Month = s.FromMonth } into g
                              select new
                              {
                                  g.Key.Id,
                                  Commence = new DateTime(g.Key.Year, g.Key.Month, 1),
                                  Level = schedules.First(c => c.Id == g.Key.Id).Level,
                                  Duration = schedules.First(c => c.Id == g.Key.Id).Duration,
                                  Description = schedules.First(c => c.Id == g.Key.Id).Description,
                                  Name = schedules.First(c => c.Id == g.Key.Id).Name,
                                  Image = schedules.First(c => c.Id == g.Key.Id).Image,
                                  Prices = schedules.Where(c => c.Id == g.Key.Id && c.FromYear == g.Key.Year && c.FromMonth == g.Key.Month).Select(x => x.DefaultPrice).OrderBy(x => x.Amount).ToList(),
                                  Location = schedules.Where(c => c.Id == g.Key.Id && c.FromYear == g.Key.Year && c.FromMonth == g.Key.Month).Select(x => x.Location).Distinct().Aggregate((a, b) => (a + ", " + b))
                              }

                );
            int total = courseInfo.ToList().Count;
            courseInfo = courseInfo.Skip(offset).Take(fetchSize).ToList();
            

            return Ok(new { total, courseInfo });
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

            _context.Entry(schedule).State = EntityState.Modified;

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

            return NoContent();
        }

        // POST: api/Schedules
        [HttpPost]
        public async Task<IActionResult> PostSchedule([FromBody] Schedule schedule)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Schedule.Add(schedule);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSchedule", new { id = schedule.Id }, schedule);
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

            schedule.Active = 0;
            _context.Entry(schedule).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return Ok(schedule);
        }

        private bool ScheduleExists(int id)
        {
            return _context.Schedule.Any(e => e.Id == id);
        }
    }
}