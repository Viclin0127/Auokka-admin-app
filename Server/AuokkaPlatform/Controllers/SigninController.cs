using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuokkaPlatform.Models;
using AuokkaPlatform.Utility;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AuokkaPlatform.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SigninController : ControllerBase
    {
        private readonly AuokkaContext _context;

        public SigninController(AuokkaContext context)
        {
            _context = context;
        }

        [HttpPut("withemail")]
        public async Task<IActionResult> emailSignin([FromBody] Student credential)
        {

            try
            {
                Student user = _context.Student
                    .FirstOrDefault(s => s.Email == credential.Email && 
                                    s.Password == Utility.Utils.Hash(credential.Password));
                return await signin(user);
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.StackTrace);
                return StatusCode(500);
            }
        }

        [HttpPut("withmobile")]
        public async Task<IActionResult> mobileSignin([FromBody] Student credential)
        {
            Student user = _context.Student
                    .FirstOrDefault(s => s.Mobile == credential.Mobile &&
                                    s.SigninCode == credential.SigninCode &&
                                    s.SigninCodeExpired > DateTime.Now);
            return await signin(user);
        }

        [HttpPut("asksignincode")]
        public async Task<IActionResult> AskSigninCode([FromBody] Student credential)
        {
            try
            {
                Student user = _context.Student
                    .FirstOrDefault(s => s.Mobile == credential.Mobile);
                if(user != null)
                {
                    string tempCode = "";
                    Random rd = new Random(DateTime.Now.DayOfYear);

                    for (int i = 0; i < 8; i++)
                    {
                        tempCode += rd.Next(0, 10);
                    }

                    user.SigninCode = tempCode;
                    user.SigninCodeExpired = DateTime.Now.AddMinutes(5);
                    user.SigninCode = "12345";
                    if(await _context.SaveChangesAsync() > 0)
                    {
                        string content = "Your code for signing in is: " + tempCode;
                        //return Ok(TxtUtil.SendSMS(user.Mobile, content));
                        return Ok();
                    }
                    else
                    {
                        return Ok(false);
                    }
                    
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


        private async Task<IActionResult> signin(Student user)
        {
            try
            {
                if (user != null)
                {
                    string token = Utility.Utils.Hash(user.Id + DateTime.Now.ToString());
                    user.Token = Utility.Utils.Hash(token);
                    user.TokenExpiry = DateTime.Now.AddDays(30);
                    await _context.SaveChangesAsync();
                    return Ok(new { token });
                }
                else
                {
                    return Unauthorized();
                }
            }
            catch
            {
                return StatusCode(500);
            }
            
        }
    }
}