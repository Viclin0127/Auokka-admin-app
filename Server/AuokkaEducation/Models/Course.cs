using System;
using System.Collections.Generic;

namespace AuokkaEducation.Models
{
    public partial class Course
    {
        public Course()
        {
            Schedule = new HashSet<Schedule>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public sbyte Active { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
        public string Detail { get; set; }
        public string Level { get; set; }
        public DateTime? CreateTime { get; set; }
        public DateTime? UpdateTime { get; set; }
        public sbyte Deleted { get; set; }

        public ICollection<Schedule> Schedule { get; set; }
    }
}
