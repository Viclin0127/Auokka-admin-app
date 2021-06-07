using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AuokkaAdmin.Models;
using System.Net.Http;
using System.IO;
using Microsoft.Extensions.Configuration;

namespace AuokkaAdmin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        private readonly AuokkaContext _context;
        private readonly IConfiguration _configuration;

        public CoursesController(AuokkaContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // GET: api/Courses
        [HttpGet("{offset}/{size}")]
        public ActionResult GetCourseShort([FromRoute]int offset, [FromRoute] int size = 20)
        {
            var courseBuffer = _context.Course.Where(c => c.Deleted == 0);
            var total = courseBuffer.Count();

            var courses = courseBuffer
                            .Skip(offset)
                            .Take(size)
                            .Select(c => new
                            {
                                c.Id,
                                c.Image,
                                c.Name,
                                c.Level,
                                c.Active,
                                c.CreateTime
                            }
                            )
                            .OrderByDescending(c => c.CreateTime)
                            .ToArray();

            return Ok(new {total, courses });
        }

        // GET: api/Courses/5
        [HttpGet("{id}")]
        public IActionResult GetCourse([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var course = _context.Course
                                .Include(c => c.Schedule)
                                    .ThenInclude(s => s.DefaultPrice)
                                .Where(c => c.Id == id && c.Deleted == 0)
                                .Select(c => new {
                                    c.Id,
                                    c.Name,
                                    c.Image,
                                    c.Level,
                                    c.Active,
                                    c.Detail,
                                    c.Description,
                                    Schedule = c.Schedule.Where(s=> s.Deleted == 0).Select(s => new
                                    {
                                        s.Id,
                                        s.DefaultPrice,
                                        s.From,
                                        s.To,
                                        s.Active,
                                        s.Location
                                    })

                                }).First();

            if (course == null)
            {
                return NotFound();
            }

            return Ok(course);
        }

        // PUT: api/Courses/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCourse([FromRoute] int id, [FromBody] Course course)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != course.Id)
            {
                return BadRequest();
            }

            _context.Entry(course).Property(c => c.Active).IsModified = true;
            _context.Entry(course).Property(c => c.Name).IsModified = true;
            _context.Entry(course).Property(c => c.Level).IsModified = true;
            _context.Entry(course).Property(c => c.Description).IsModified = true;
            _context.Entry(course).Property(c => c.Detail).IsModified = true;
            _context.Entry(course).Property(c => c.Image).IsModified = true;
            course.UpdateTime = DateTime.Now;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CourseExists(id))
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

        // POST: api/Courses
        [HttpPost]
        public async Task<IActionResult> PostCourse([FromBody] Course course)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Course.Add(course);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCourse", new { id = course.Id }, course);
        }

        // DELETE: api/Courses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCourse([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var course = await _context.Course.FindAsync(id);
            if (course == null)
            {
                return NotFound();
            }

            _context.Course.Remove(course);
            await _context.SaveChangesAsync();

            return Ok(course);
        }

        [HttpPost("uploadimage/{category}")]
        public async Task<Object> Upload([FromRoute] string category)
        {
            try
            {
                var file = Request.Form.Files[0];
                using (HttpClient client = new HttpClient())
                {
                    //client.BaseAddress = new Uri("http://119.9.52.51:9997/api/files/uploadimage/course/");
                    byte[] data;
                    using (var br = new BinaryReader(file.OpenReadStream()))
                        data = br.ReadBytes((int)file.OpenReadStream().Length);
                    ByteArrayContent bytes = new ByteArrayContent(data);


                    MultipartFormDataContent multiContent = new MultipartFormDataContent();
                    multiContent.Add(bytes, "file", file.FileName);
                    var result = await client.PostAsync(_configuration.GetValue<string>("imageServer") + "/api/files/uploadimage/" + category, multiContent);
                    //var result = await client.PostAsync("https://localhost:44394/api/files/uploadimage/" + category, multiContent);
                    if (result.IsSuccessStatusCode)
                    {
                        var body = await result.Content.ReadAsAsync<Object>();
                        return body;
                    }
                    else
                    {
                        return NotFound();
                    }
                    
                }


            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return NotFound("Failed to upload file");
            }

        }
    
    [HttpPut("active/{id}")]
    public async Task<ActionResult> ToggleActive([FromRoute] int id, [FromBody] Course c)
    {
            _context.Entry(c).Property(course => course.Active).IsModified = true;
            await _context.SaveChangesAsync();
            return Ok();

    }

    private bool CourseExists(int id)
    {
        return _context.Course.Any(e => e.Id == id);
    }

    }
}