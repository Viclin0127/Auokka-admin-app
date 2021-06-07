using System;
using System.Collections.Generic;

namespace AuokkaAdmin.Models
{
    public partial class Location
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public sbyte Active { get; set; }
    }
}
