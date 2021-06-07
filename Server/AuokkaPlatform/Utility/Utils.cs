using Microsoft.Extensions.Configuration;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace AuokkaPlatform.Utility
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

        public static string GetMD5(string str)
        {
            // step 1, calculate MD5 hash from input
            MD5 md5 = System.Security.Cryptography.MD5.Create();
            byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(str);
            byte[] hash = md5.ComputeHash(inputBytes);

            // step 2, convert byte array to hex string
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < hash.Length; i++)
            {
                sb.Append(hash[i].ToString("X2"));
            }
            return sb.ToString();
        }

        public static IConfiguration GetConfig()
        {
            IConfigurationBuilder configurationBuilder = new ConfigurationBuilder();
            configurationBuilder.SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json");
            IConfiguration configuration = configurationBuilder.Build();
            return configuration;
        }

        public static string ReadTextFromFile(string filepath)
        {
            using (TextReader tr = new StreamReader(filepath))
            {
                string contents = tr.ReadToEnd();
                tr.Close();
                return contents;
            }
        }
    }
}
