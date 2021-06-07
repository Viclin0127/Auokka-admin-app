using System;
using System.Collections.Generic;

namespace AuokkaEducation.Models
{
    public partial class Admin
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public DateTime CreateTime { get; set; }
        public DateTime UpdateTime { get; set; }
    }
}
