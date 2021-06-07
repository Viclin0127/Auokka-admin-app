using System;
using System.Collections.Generic;

namespace AuokkaEducation.Models
{
    public partial class Teacher
    {
        public Teacher()
        {
            Schedule = new HashSet<Schedule>();
            Teacherloginhistory = new HashSet<Teacherloginhistory>();
        }

        public int Id { get; set; }
        public string Firstname { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Image { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public sbyte Active { get; set; }
        public DateTime? CreateTime { get; set; }
        public DateTime? UpdateTime { get; set; }
        public string Token { get; set; }
        public DateTime? LastLogin { get; set; }
        public DateTime? TokenExpiry { get; set; }
        public sbyte Deleted { get; set; }

        public ICollection<Schedule> Schedule { get; set; }
        public ICollection<Teacherloginhistory> Teacherloginhistory { get; set; }
    }
}
