using System;
using System.Collections.Generic;

namespace AuokkaAdmin.Models
{
    public partial class Studentloginhistory
    {
        public DateTime Time { get; set; }
        public int StudentId { get; set; }
        public string Ip { get; set; }

        public Student Student { get; set; }
    }
}
