using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AuokkaEducation.Models;
using Microsoft.Extensions.Primitives;
using AuokkaEducation.Utility;

namespace AuokkaEducation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnrollmentsController : ControllerBase
    {
        private readonly AuokkaContext _context;

        public EnrollmentsController(AuokkaContext context)
        {
            _context = context;
        }

        //GET: api/Enrollments
        [HttpGet("inprogress")]
        public ObjectResult GetEnrollmentInProgress()
        {
            Student student;
            if ((student = (Student)Utility.Utility.validate(Utility.Utility.validateStudentToken(), Request, _context)) == null)
            {
                return NotFound(new ResponseError(ErrorCode.UNAUTHORISED_ACCESS));
            }
            var enrollments = _context.Enrollment
                                .Include(e => e.Schedule)
                                    .ThenInclude(s => s.Course)
                                .Where(e => e.StudentId == student.Id && e.Paid == 1 && DateTime.Now > e.Schedule.From)
                                .Select(e => new
                                {
                                    e.Schedule.Id,
                                    e.Schedule.From,
                                    e.Schedule.To,
                                    course = new
                                    {
                                        e.Schedule.CourseId,
                                        e.Schedule.Course.Image,
                                        e.Schedule.Course.Name
                                    }
                                }).ToArray();

            return Ok(enrollments);
        }

        [HttpGet("future")]
        public ObjectResult GetEnrollmentInFuture()
        {
            Student student;
            if ((student = (Student)Utility.Utility.validate(Utility.Utility.validateStudentToken(), Request, _context)) == null)
            {
                return NotFound(new ResponseError(ErrorCode.UNAUTHORISED_ACCESS));
            }
            var enrollments = _context.Enrollment
                                .Include(e => e.Schedule)
                                    .ThenInclude(s => s.Course)
                                .Where(e => e.StudentId == student.Id && e.Paid == 1 && e.Schedule.From > DateTime.Now)
                                .Select(e => new
                                {
                                    e.Schedule.Id,
                                    e.Schedule.From,
                                    e.Schedule.To,
                                    course = new
                                    {
                                        e.Schedule.CourseId,
                                        e.Schedule.Course.Image,
                                        e.Schedule.Course.Name
                                    }
                                }).ToArray();

            return Ok(enrollments);
        }

        [HttpGet("completed")]
        public ObjectResult GetEnrollmentCompleted()
        {
            Student student;
            if ((student = (Student)Utility.Utility.validate(Utility.Utility.validateStudentToken(), Request, _context)) == null)
            {
                return NotFound(new ResponseError(ErrorCode.UNAUTHORISED_ACCESS));
            }
            var enrollments = _context.Enrollment
                                .Include(e => e.Schedule)
                                    .ThenInclude(s => s.Course)
                                .Where(e => e.StudentId == student.Id && e.Paid == 1 && DateTime.Now > e.Schedule.To)
                                .Select(e => new
                                {
                                    e.Schedule.Id,
                                    e.Schedule.From,
                                    e.Schedule.To,
                                    course = new
                                    {
                                        e.Schedule.CourseId,
                                        e.Schedule.Course.Image,
                                        e.Schedule.Course.Name
                                    }
                                }).ToArray();

            return Ok(enrollments);
        }

        // GET: api/Enrollments/5
        [HttpGet("{id}")]
        public IActionResult GetEnrollment([FromRoute] int id)
        {
            Student student;
            if ((student = (Student)Utility.Utility.validate(Utility.Utility.validateStudentToken(), Request, _context)) == null)
            {
                return NotFound(new ResponseError(ErrorCode.UNAUTHORISED_ACCESS));
            }

            var enrollment = _context.Enrollment
                                    .Include(e => e.Schedule)
                                        .ThenInclude(s => s.Course)
                                    .Where(e => e.Id == id && e.StudentId == student.Id)
                                    .Select(e => new {
                                        e.Id,
                                        schedule = new {
                                            e.Schedule.Id,
                                            e.Schedule.From,
                                            e.Schedule.To,
                                            e.Schedule.Location,
                                            course = new
                                            {
                                                e.Schedule.Course.Name
                                            }
                                        },
                                        e.EnrolBirthDate,
                                        e.EnrolEmail,
                                        e.EnrolFirstname,
                                        e.EnrolSurname,
                                        e.EnrolPhone,
                                        e.EnrolSchool,
                                        e.Fee
                                    }).ToArray()[0];

            if (enrollment == null)
            {
                return NotFound(new ResponseError(ErrorCode.UNAUTHORISED_ACCESS));
            }

            return Ok(enrollment);
        }

        // PUT: api/Enrollments/5
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutEnrollment([FromRoute] int id, [FromBody] Enrollment enrollment)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != enrollment.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(enrollment).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!EnrollmentExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        // POST: api/Enrollments
        [HttpPost]
        public async Task<IActionResult> PostEnrollment([FromBody] Enrollment enrollment)
        {
            Student student;
            try
            {
                if ((student = (Student)Utility.Utility.validate(Utility.Utility.validateStudentToken(), Request, _context)) != null)
                {
                    enrollment.StudentId = student.Id;
                    enrollment.Fee = _context.Schedule.Include(s => s.DefaultPrice).SingleOrDefault(s => s.Id == enrollment.ScheduleId).DefaultPrice.Amount;
                    enrollment.Paid = 0;
                    _context.Enrollment.Add(enrollment);
                    await _context.SaveChangesAsync();

                    return Ok(new { enrollment.Id });
                }
                else
                {
                    return NotFound(new ResponseError(ErrorCode.UNAUTHORISED_ACCESS));
                }
            }
            catch(Exception e)
            {
                return NotFound(new ResponseError(ErrorCode.UNKNOWN_ERROR));
            }
            
            
        }

        //// DELETE: api/Enrollments/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteEnrollment([FromRoute] int id)
        //{

        //    var enrollment = await _context.Enrollment.FindAsync(id);
        //    if (enrollment == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Enrollment.Remove(enrollment);
        //    await _context.SaveChangesAsync();

        //    return Ok(enrollment);
        //}

        private bool EnrollmentExists(int id)
        {
            return _context.Enrollment.Any(e => e.Id == id);
        }
    }
}