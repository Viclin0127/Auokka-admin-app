using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuokkaEducation.Utility
{
    public class ErrorCode
    {
        public static int UNAUTHORISED_ACCESS = 0;
        public static int UNKNOWN_ERROR = 1;
        public static string[] ERROR_MSG = new string[]
        {
            "You are not given permission to perform this action.",
            "Unknown issue has occurred, please contact administrater for more detail."
        };
    }
}
