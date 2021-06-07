using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AuokkaPlatform.Eqtytour;
using AuokkaPlatform.Models;
using AuokkaPlatform.Utility;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuokkaPlatform.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SignupController : ControllerBase
    {
        private readonly AuokkaContext _context;

        public SignupController(AuokkaContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> AddAccount([FromBody] Student account)
        {
            try
            {
                account.Username = account.Email;
                string passwordBuffer = account.Password;
                account.Password = Utils.Hash(account.Password);
                account.ValidationCode = Utils.Hash(account.Email + account.Password + DateTime.Now.ToString());
                _context.Student.Add(account);
                await _context.SaveChangesAsync();

                //for enjoyaus
                using (var equitydb = new staging_equitycdb_tourContext())
                {
                    WebCustomer enjoyausCustomer = new WebCustomer
                    {
                        Firstname = account.Firstname,
                        Surname = account.Surname,
                        Nickname = account.Firstname + " " + account.Surname,
                        Email = account.Email,
                        Phone = account.Mobile,
                        Subscribe = 0,
                        Password = Utils.GetMD5(passwordBuffer),
                        EmailVerify = 0
                    };
                    equitydb.WebCustomer.Add(enjoyausCustomer);
                    await equitydb.SaveChangesAsync();
                }

                string link = Utils.GetConfig().GetSection("SignupConfirmLink").Value;
                new Thread(() =>
                {
                    try
                    {
                        string emailbody = Utils.ReadTextFromFile(@"./EmailTemplate/signupConfirm.html");
                        emailbody = emailbody.Replace("[LINK]", link + account.ValidationCode);
                        EmailUtil email = new EmailUtil();
                        email
                            .SetBody(emailbody)
                            .SetSubject("Auokka account validation")
                            .AddMailAddress(account.Email)
                            .Send();
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex);
                    }
                }).Start();
                return Ok();
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.StackTrace);
                return BadRequest("Issue occurred during the process");
            }
            
        }

        [HttpGet("{ValidationCode}")]
        public async Task<IActionResult> ValidateAccount([FromRoute] string ValidationCode)
        {
            const int NOT_FOUND = 0;
            const int SUCCESS = 1;
            const int NO_CHANGE = 2;
            const int UNKNOWN_ERROR = 3;
            try
            {
                Student account = _context.Student.FirstOrDefault(s => s.ValidationCode == ValidationCode);
                if(account != null)
                {
                    account.Validated = 1;
                    var changed = await _context.SaveChangesAsync() > 0 ? true : false;
                    //for enjoyaus
                    if (changed)
                    {
                        using (var equitydb = new staging_equitycdb_tourContext())
                        {
                            var enjoyausCustomer = await equitydb.WebCustomer.FirstOrDefaultAsync(a => a.Email == account.Email);
                            if(enjoyausCustomer != null)
                            {
                                enjoyausCustomer.EmailVerify = 1;
                                await equitydb.SaveChangesAsync();
                            }
                            
                        }
                    }
                    
                    return (changed ? Ok(SUCCESS) : Ok(NO_CHANGE));
                }
                else
                {
                    return Ok(NOT_FOUND);
                }
                
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.StackTrace);
                return BadRequest(UNKNOWN_ERROR);
            }
        }

        [HttpGet("emailexist/{email}")]
        public IActionResult EmailExist([FromRoute] string email)
        {
            try
            {
                return Ok(_context.Student.Any(s => s.Email == email));

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.StackTrace);
                return BadRequest();
            }
        }
    }
}