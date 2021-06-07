using System;
using System.Collections.Generic;

namespace AuokkaAdmin.Models
{
    public partial class Articletag
    {
        public int Id { get; set; }
        public int ArticleId { get; set; }
        public int TagId { get; set; }

        public Article Article { get; set; }
        public Tag Tag { get; set; }
    }
}
