using System;
using System.Collections.Generic;

namespace AuokkaEducation.Models
{
    public partial class Price
    {
        public Price()
        {
            ScheduleNavigation = new HashSet<Schedule>();
        }

        public int Id { get; set; }
        public int? ScheduleId { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; }
        public DateTime? CreateTime { get; set; }
        public DateTime? UpdateTime { get; set; }
        public sbyte Active { get; set; }
        public sbyte Deleted { get; set; }

        public Schedule Schedule { get; set; }
        public ICollection<Schedule> ScheduleNavigation { get; set; }
    }
}
