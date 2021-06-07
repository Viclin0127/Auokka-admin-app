using System;
using System.Collections.Generic;

namespace AuokkaAdmin.Models
{
    public partial class Article
    {
        public Article()
        {
            Articletag = new HashSet<Articletag>();
        }

        public int Id { get; set; }
        public int? AuthorId { get; set; }
        public string AuthorName { get; set; }
        public DateTime CreateTime { get; set; }
        public int Approved { get; set; }
        public sbyte Show { get; set; }
        public sbyte Deleted { get; set; }
        public string Title { get; set; }
        public string File { get; set; }
        public string ProposedTags { get; set; }
        public string RejectReason { get; set; }

        public Student Author { get; set; }
        public ICollection<Articletag> Articletag { get; set; }
    }
}
