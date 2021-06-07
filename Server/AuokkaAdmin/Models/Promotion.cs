using System;
using System.Collections.Generic;

namespace AuokkaAdmin.Models
{
    public partial class Promotion
    {
        public int Id { get; set; }
        public string Source { get; set; }
        public string Description { get; set; }
        public string Code { get; set; }
        public DateTime? Expired { get; set; }
        public DateTime CreateTime { get; set; }
    }
}
