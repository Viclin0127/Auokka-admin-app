using System;
using System.Collections.Generic;

namespace AuokkaAdmin.Models
{
    public partial class Teacherloginhistory
    {
        public DateTime Time { get; set; }
        public int TeacherId { get; set; }
        public string Ip { get; set; }

        public Teacher Teacher { get; set; }
    }
}
