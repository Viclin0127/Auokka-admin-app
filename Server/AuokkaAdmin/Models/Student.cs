using System;
using System.Collections.Generic;

namespace AuokkaAdmin.Models
{
    public partial class Student
    {
        public Student()
        {
            Article = new HashSet<Article>();
            Enrollment = new HashSet<Enrollment>();
            Studentloginhistory = new HashSet<Studentloginhistory>();
        }

        public int Id { get; set; }
        public string Firstname { get; set; }
        public string Surname { get; set; }
        public DateTime? BirthDate { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string School { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public sbyte Active { get; set; }
        public DateTime? CreateTime { get; set; }
        public DateTime? UpdateTime { get; set; }
        public string Image { get; set; }
        public string Token { get; set; }
        public DateTime? LastLogin { get; set; }
        public DateTime? TokenExpiry { get; set; }
        public sbyte Deleted { get; set; }
        public sbyte Validated { get; set; }
        public string ValidationCode { get; set; }
        public string Wechat { get; set; }
        public string SigninCode { get; set; }
        public DateTime? SigninCodeExpired { get; set; }

        public ICollection<Article> Article { get; set; }
        public ICollection<Enrollment> Enrollment { get; set; }
        public ICollection<Studentloginhistory> Studentloginhistory { get; set; }
    }
}
