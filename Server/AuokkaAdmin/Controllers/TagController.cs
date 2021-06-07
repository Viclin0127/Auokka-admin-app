using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuokkaAdmin.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuokkaAdmin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : ControllerBase
    {
        private readonly AuokkaContext _context;

        public TagController(AuokkaContext context)
        {
            _context = context;
        }

        [HttpGet("{key}")]
        public async Task<IActionResult> Search([FromRoute] string key)
        {
            try
            {
                var tags = await _context
                                .Tag
                                .Where(t => t.Name.Contains(key))
                                .Select(t => new { t.Id, t.Name })
                                .Take(15).ToArrayAsync();
                return Ok(tags);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.StackTrace);
                return StatusCode(500);
            }
        }
    }
}