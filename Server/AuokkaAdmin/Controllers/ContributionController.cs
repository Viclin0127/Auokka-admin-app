using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuokkaAdmin.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace AuokkaAdmin.Controllers
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

        [HttpGet("{status}")]
        public async Task<IActionResult> GetArticleByApprovalStatus([FromRoute]int status)
        {
            try
            {
                var contributions = await _context
                                .Article
                                .Include(a => a.Articletag)
                                .Where(a => a.Deleted == 0 && a.Approved == status)
                                .Select(a => new
                                {
                                    a.Id,
                                    a.Title,
                                    a.AuthorName,
                                    a.Articletag,
                                    a.CreateTime,
                                    File = "https://localhost:44394/api/files/word/" + a.File,
                                    a.Approved,
                                    a.Show,
                                    RejectReason = a.Approved == -1 ? a.RejectReason : "",
                                    Tags = JsonConvert.DeserializeObject<dynamic>(a.ProposedTags)
                                })
                                .ToArrayAsync();
                return Ok(contributions);
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.StackTrace);
                return StatusCode(500);
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateApprovalStatus([FromBody] Article article)
        {
            try
            {
                var updateArticle = await _context.Article.FirstOrDefaultAsync(a => a.Id == article.Id);
                if(updateArticle != null)
                {
                    updateArticle.Approved = article.Approved;

                    if(article.Approved == -1)//rejected
                    {
                        updateArticle.RejectReason = article.RejectReason;
                    }
                    else if (article.Approved == 1)
                    {
                        Dictionary<string, string>[] tags = JsonConvert.DeserializeObject<Dictionary<string, string>[]>(article.ProposedTags);
                        foreach(Dictionary<string, string> t in tags)
                        {
                            string id = t["id"];
                            string name = t["name"];
                            if (int.TryParse(id, out int n))
                            {
                                if (!await _context.Articletag.AnyAsync(at => at.TagId == n && at.ArticleId == article.Id))
                                {
                                    _context.Articletag.Add(new Articletag
                                    {
                                        ArticleId = article.Id,
                                        TagId = n
                                    });
                                }
                            }
                            else
                            {
                                var tag = await _context.Tag.FirstOrDefaultAsync(tg => tg.Name == name);
                                if (tag==null)
                                {
                                    var newTag = new Tag { Name = name };
                                    _context.Tag.Add(newTag);
                                    await _context.SaveChangesAsync();
                                    _context.Articletag.Add(new Articletag
                                    {
                                        ArticleId = article.Id,
                                        TagId = newTag.Id
                                    });
                                }
                                else
                                {
                                    if(!await _context.Articletag.AnyAsync(at => at.TagId == tag.Id && at.ArticleId == article.Id))
                                    {
                                        _context.Articletag.Add(new Articletag
                                        {
                                            ArticleId = article.Id,
                                            TagId = tag.Id
                                        });
                                    }
                                    
                                }
                                
                            }
                        }
                        updateArticle.ProposedTags = article.ProposedTags;
                    }
                    
                    await _context.SaveChangesAsync();
                    return Ok();
                }
                else
                {
                    return Unauthorized();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.StackTrace);
                return StatusCode(500);
            }
        }
    }
}