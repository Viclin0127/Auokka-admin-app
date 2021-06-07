using System;
using System.Collections.Generic;

namespace AuokkaPlatform.Models
{
    public partial class Tag
    {
        public Tag()
        {
            Articletag = new HashSet<Articletag>();
            InverseTagNavigation = new HashSet<Tag>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public sbyte Deleted { get; set; }
        public int? TagId { get; set; }

        public Tag TagNavigation { get; set; }
        public ICollection<Articletag> Articletag { get; set; }
        public ICollection<Tag> InverseTagNavigation { get; set; }
    }
}
