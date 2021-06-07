using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuokkaEducation.Models;
using AuokkaEducation.Utility;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AuokkaEducation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {

        private readonly AuokkaContext _context;

        public LoginController(AuokkaContext context)
        {
            _context = context;
        }
        
        [HttpPut("studentLogin")]
        public async Task<IActionResult> StudentLogin([FromBody] Student student)
        {
            student.Password = Utility.Utility.Hash(student.Password);
            try
            {
                Student usr = _context.Student.SingleOrDefault(s => student.Username == s.Username && student.Password == s.Password);
                if(usr == null)
                {
                    return NotFound("Your username or password is incorrect, please try again");
                }
                else
                {
                    string token = Utility.Utility.Hash(DateTime.Now.ToString() + usr.Id + usr.Username + usr.Password);
                    usr.Token = Utility.Utility.Hash(token);
                    usr.TokenExpiry = DateTime.Now.AddDays(30);
                    await _context.SaveChangesAsync();
                    return Ok(new
                    {
                        usr.Firstname,
                        usr.Surname,
                        token
                    });
                }
            }
            catch(Exception e)
            {
                return NotFound("Unknown issue has occurred");
            }
        }

        [HttpGet("isStudentLogin")]
        public IActionResult IsStudentLogin()
        {
            Student student;
            if ((student = (Student)Utility.Utility.validate(Utility.Utility.validateStudentToken(), Request, _context)) == null)
            {
                return NotFound(new ResponseError(ErrorCode.UNAUTHORISED_ACCESS));
            }
            else
            {
                return Ok(new
                {
                    student.Firstname,
                    student.Surname,
                    student.Email,
                    student.Mobile,
                    student.School,
                    student.BirthDate
                });
            }
        }
    }
}