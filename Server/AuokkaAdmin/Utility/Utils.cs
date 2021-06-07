using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace AuokkaAdmin.Utility
{
    public class Utils
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
    }
}
