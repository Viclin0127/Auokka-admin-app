using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuokkaEducation.Utility
{
    public class ResponseError
    {
        

        int code;
        string message;

        public ResponseError()
        {

        }

        public ResponseError(int code)
        {
            this.code = code;
            this.message = ErrorCode.ERROR_MSG[code];
        }
    }
}
