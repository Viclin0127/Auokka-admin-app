using System;
using System.Collections.Generic;

namespace AuokkaAdmin.Models
{
    public partial class Enrollment
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public int ScheduleId { get; set; }
        public string EnrolFirstname { get; set; }
        public string EnrolSurname { get; set; }
        public DateTime? EnrolBirthDate { get; set; }
        public string EnrolEmail { get; set; }
        public string EnrolPhone { get; set; }
        public string EnrolSchool { get; set; }
        public decimal? Fee { get; set; }
        public DateTime CreateTime { get; set; }
        public DateTime UpdateTime { get; set; }
        public sbyte Paid { get; set; }
        public sbyte Active { get; set; }
        public sbyte Deleted { get; set; }

        public Schedule Schedule { get; set; }
        public Student Student { get; set; }
    }
}
