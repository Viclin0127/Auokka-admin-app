using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuokkaPlatform.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Primitives;

namespace AuokkaPlatform.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly AuokkaContext _context;

        public ProfileController(AuokkaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetProfile()
        {
            try
            {
                Request.Headers.TryGetValue("Authorization", out StringValues token);
                Student user = await _context.Student.FirstOrDefaultAsync(s => s.Token == Utility.Utils.Hash(token));
                if (user != null)
                {
                    return Ok(new
                    {
                        user.Id,
                        user.Firstname,
                        user.Surname,
                        user.Email,
                        user.Mobile,
                        user.Wechat
                    });
                }
                else
                {
                    return Unauthorized();
                }
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.StackTrace);
                return StatusCode(500);
            }
            
        }

        [HttpPut]
        public async Task<IActionResult> UpdateProfile([FromBody] Student profile)
        {
            try
            {
                Request.Headers.TryGetValue("Authorization", out StringValues token);
                Student user = await _context.Student.FirstOrDefaultAsync(s => s.Token == Utility.Utils.Hash(token) && s.Id == profile.Id);
                if (user != null)
                {
                    user.Firstname = profile.Firstname;
                    user.Surname = profile.Surname;
                    user.Mobile = profile.Mobile;
                    user.Wechat = profile.Wechat;
                    await _context.SaveChangesAsync();
                    return Ok();
                }
                else
                {
                    return Unauthorized();
                }
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.StackTrace);
                return StatusCode(500);
            }
        }
    }
}