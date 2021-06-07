using System;
using System.Collections.Generic;

namespace AuokkaEducation.Models
{
    public partial class Schedule
    {
        public Schedule()
        {
            Enrollment = new HashSet<Enrollment>();
            Price = new HashSet<Price>();
        }

        public int Id { get; set; }
        public int CourseId { get; set; }
        public string Duration { get; set; }
        public DateTime? From { get; set; }
        public DateTime? To { get; set; }
        public string Location { get; set; }
        public int? TeacherId { get; set; }
        public int DefaultPriceId { get; set; }
        public DateTime? CreateTime { get; set; }
        public DateTime? UpdateTime { get; set; }
        public sbyte Active { get; set; }
        public sbyte Deleted { get; set; }

        public Course Course { get; set; }
        public Price DefaultPrice { get; set; }
        public Teacher Teacher { get; set; }
        public ICollection<Enrollment> Enrollment { get; set; }
        public ICollection<Price> Price { get; set; }
    }
}
