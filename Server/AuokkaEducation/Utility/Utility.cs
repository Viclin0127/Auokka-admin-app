using AuokkaEducation.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace AuokkaEducation.Utility
{
    public class Utility
    {

        public static string Hash(string str)
        {
            HashAlgorithm algorithm = SHA256.Create();
            var data = algorithm.ComputeHash(Encoding.UTF8.GetBytes(str));
            var sBuilder = new StringBuilder();
            // Loop through each byte of the hashed data 
            // and format each one as a hexadecimal string.
            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }
            // Return the hexadecimal string.
            return sBuilder.ToString();
        }


        public static Func<HttpRequest, AuokkaContext, Object> validateStudentToken()
        {
            return (request, context) =>
            {
                request.Headers.TryGetValue("Authorization", out StringValues token);
                token = Hash(token);
                var student = context.Student.SingleOrDefault(s => s.Token == token && s.TokenExpiry > DateTime.Now);
                student.TokenExpiry = student != null ? DateTime.Now.AddDays(30) : student.TokenExpiry;
                context.SaveChanges();
                return student == null ? null : student;
            };
        }

        public static Func<HttpRequest, AuokkaContext, Object> validateTeacherToken()
        {
            return (request, context) =>
            {
                request.Headers.TryGetValue("Authorization", out StringValues token);
                token = Hash(token);
                var teacher = context.Teacher.SingleOrDefault(s => s.Token == token && s.TokenExpiry > DateTime.Now);
                teacher.TokenExpiry = teacher != null ? DateTime.Now.AddDays(30) : teacher.TokenExpiry;
                context.SaveChanges();
                return teacher == null ? null : teacher;
            };
        }

        public static Object validate(Func<HttpRequest, AuokkaContext, Object> f, HttpRequest rq, AuokkaContext context)
        {
            return f(rq, context);
        }

    }
}
