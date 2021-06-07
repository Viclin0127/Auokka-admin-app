using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AuokkaAdmin.Models;
using AuokkaAdmin.Utility;

namespace AuokkaAdmin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeachersController : ControllerBase
    {
        private readonly AuokkaContext _context;

        public TeachersController(AuokkaContext context)
        {
            _context = context;
        }

        // GET: api/Teachers
        [HttpGet("{offset}/{size}")]
        public ActionResult GetTeacher([FromRoute]int offset, [FromRoute] int size = 20)
        {

            var buffer = _context.Teacher
                    .Where(t => t.Deleted == 0);
            var total = buffer.Count();

            var teachers = buffer.Skip(offset)
                    .Take(size)
                    .Select(t => new
                    {
                        t.Id,
                        t.Firstname,
                        t.Surname,
                        t.Username,
                        t.Description,
                        t.Title,
                        t.Mobile,
                        t.Image,
                        t.Email,
                        t.Active,
                        t.CreateTime
                    }).ToArray();
            return Ok(new { total, teachers });
        }

        // GET: api/Teachers/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTeacher([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var teacher = await _context.Teacher.FindAsync(id);

            if (teacher == null)
            {
                return NotFound();
            }

            return Ok(teacher);
        }

        // PUT: api/Teachers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTeacher([FromRoute] int id, [FromBody] Teacher teacher)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != teacher.Id)
            {
                return BadRequest();
            }

            _context.Entry(teacher).Property(t => t.Firstname).IsModified = true;
            _context.Entry(teacher).Property(t => t.Surname).IsModified = true;
            _context.Entry(teacher).Property(t => t.Description).IsModified = true;
            _context.Entry(teacher).Property(t => t.Title).IsModified = true;
            _context.Entry(teacher).Property(t => t.Active).IsModified = true;
            _context.Entry(teacher).Property(t => t.Email).IsModified = true;
            _context.Entry(teacher).Property(t => t.Mobile).IsModified = true;
            teacher.UpdateTime = DateTime.Now;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TeacherExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(teacher);
        }

        // POST: api/Teachers
        [HttpPost]
        public async Task<IActionResult> PostTeacher([FromBody] Teacher teacher)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            teacher.Password = Utils.Hash(teacher.Password);
            _context.Teacher.Add(teacher);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTeacher", new { id = teacher.Id }, teacher);
        }

        // DELETE: api/Teachers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeacher([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var teacher = await _context.Teacher.FindAsync(id);
            if (teacher == null)
            {
                return NotFound();
            }

            _context.Teacher.Remove(teacher);
            await _context.SaveChangesAsync();

            return Ok(teacher);
        }

        [HttpPut("active/{id}")]
        public async Task<ActionResult> ToggleActive([FromRoute] int id, [FromBody] Teacher t)
        {
            _context.Entry(t).Property(teacher => teacher.Active).IsModified = true;
            await _context.SaveChangesAsync();
            return Ok();

        }

        [HttpGet("existUsername/{username}")]
        public async Task<IActionResult> existUsername([FromRoute] string username)
        {
            return Ok(await _context.Teacher.AnyAsync(t => t.Username == username));
        }

        private bool TeacherExists(int id)
        {
            return _context.Teacher.Any(e => e.Id == id);
        }
    }
}