using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using AuokkaPlatform.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;

namespace AuokkaPlatform.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContributionController : ControllerBase
    {
        private readonly AuokkaContext _context;

        public ContributionController(AuokkaContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateContribution([FromBody]dynamic contribution)
        {
            try
            {
                Request.Headers.TryGetValue("Authorization", out StringValues token);
                Student user = await _context.Student.FirstOrDefaultAsync(s => s.Token == Utility.Utils.Hash(token));
                if(user == null)
                {
                    return Unauthorized();
                }
                Article article = new Article
                {
                    AuthorId = user.Id,
                    Title = contribution.title,
                    AuthorName = user.Surname + ' ' + user.Firstname,
                    File = contribution.filename,
                    ProposedTags = contribution.tags
                };
                _context.Article.Add(article);
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.StackTrace);
                return StatusCode(500);
            }
            
        }

        [HttpGet("approved")]
        public async Task<IActionResult> GetApprovedContribution()
        {
            try
            {
                Request.Headers.TryGetValue("Authorization", out StringValues token);
                Student user = await _context.Student.FirstOrDefaultAsync(s => s.Token == Utility.Utils.Hash(token));
                if (user == null)
                {
                    return Unauthorized();
                }
                return Ok(await _context.Article.Include(a => a.Articletag).Where(a => a.Approved == 1 && a.AuthorId == user.Id)
                    .Select(
                        a => new
                        {
                            a.Id,
                            a.AuthorName,
                            File = "https://localhost:44394/api/files/word/" + a.File,
                            a.Title,
                            a.Articletag,
                            a.CreateTime,
                            a.Approved,
                            Tags = JsonConvert.DeserializeObject<dynamic>(a.ProposedTags)
                        }
                    ).ToArrayAsync());
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.StackTrace);
                return StatusCode(500);
            }
        }

        [HttpGet("review")]
        public async Task<IActionResult> GetUnderReviewContribution()
        {
            try
            {
                Request.Headers.TryGetValue("Authorization", out StringValues token);
                Student user = await _context.Student.FirstOrDefaultAsync(s => s.Token == Utility.Utils.Hash(token));
                if (user == null)
                {
                    return Unauthorized();
                }
                return Ok(await _context.Article.Include(a => a.Articletag).Where(a => a.Approved < 1 && a.AuthorId == user.Id)
                    .Select(
                        a => new
                        {
                            a.Id,
                            a.AuthorName,
                            File = "https://localhost:44394/api/files/word/" + a.File,
                            a.Title,
                            a.Articletag,
                            a.CreateTime,
                            a.Approved,
                            RejectionReason = a.Approved == -1 ? a.RejectReason : "",
                            Tags = JsonConvert.DeserializeObject<dynamic>(a.ProposedTags)
                        }
                    ).ToArrayAsync());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.StackTrace);
                return StatusCode(500);
            }
        }

        [HttpPost("uploadpdf")]
        public async Task<Object> Upload()
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
                    //var result = await client.PostAsync("http://119.9.52.51:9997/api/files/uploadimage/" + category, multiContent);
                    var result = await client.PostAsync("https://localhost:44394/api/files/uploadword", multiContent);
                    if (result.IsSuccessStatusCode)
                    {
                        var body = await result.Content.ReadAsAsync<Object>();
                        return body;
                    }
                    else
                    {
                        return StatusCode(500);
                    }
                }


            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500);
            }

        }
    }

    
}