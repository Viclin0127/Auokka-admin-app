using System;
using System.Collections.Generic;

namespace AuokkaPlatform.Eqtytour
{
    public partial class WebCustomer
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Firstname { get; set; }
        public string Surname { get; set; }
        public string Nickname { get; set; }
        public int Gender { get; set; }
        public string Email { get; set; }
        public sbyte EmailVerify { get; set; }
        public string PhoneArea { get; set; }
        public string Phone { get; set; }
        public string Nationality { get; set; }
        public string Address { get; set; }
        public string Postcode { get; set; }
        public sbyte Subscribe { get; set; }
        public string Password { get; set; }
        public string Facebookid { get; set; }
        public string Googleid { get; set; }
        public string Family { get; set; }
        public string Cart { get; set; }
        public DateTime Createtime { get; set; }
        public string Wishlist { get; set; }
        public string Picture { get; set; }
    }
}
