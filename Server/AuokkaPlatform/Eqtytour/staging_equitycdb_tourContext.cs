using System;
using System.IO;
using AuokkaPlatform.Utility;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;

namespace AuokkaPlatform.Eqtytour
{
    public partial class staging_equitycdb_tourContext : DbContext
    {
        public staging_equitycdb_tourContext()
        {
        }

        public staging_equitycdb_tourContext(DbContextOptions<staging_equitycdb_tourContext> options)
            : base(options)
        {
        }

        public virtual DbSet<WebCustomer> WebCustomer { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            IConfiguration Configuration = Utils.GetConfig();
            if (!optionsBuilder.IsConfigured)
            {
                string dbLocation = Configuration.GetSection("Eqtytour").GetSection("Location").Value;
                string database = Configuration.GetSection("Eqtytour").GetSection("Database").Value;
                string port = Configuration.GetSection("Eqtytour").GetSection("Port").Value;
                string username = Configuration.GetSection("Eqtytour").GetSection("Username").Value;
                string password = Configuration.GetSection("Eqtytour").GetSection("Password").Value;
                optionsBuilder.UseMySql("Server=" + dbLocation + ";port=" + port + ";Database=" + database + ";username=" + username + ";password=" + password + ";TreatTinyAsBoolean=false;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<WebCustomer>(entity =>
            {
                entity.ToTable("web_customer");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Address).HasColumnType("varchar(255)");

                entity.Property(e => e.Cart).HasColumnType("text");

                entity.Property(e => e.Createtime)
                    .HasColumnType("timestamp")
                    .HasDefaultValueSql("'CURRENT_TIMESTAMP'");

                entity.Property(e => e.Email).HasColumnType("varchar(100)");

                entity.Property(e => e.EmailVerify)
                    .HasColumnType("tinyint(1)")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.Facebookid).HasColumnType("varchar(100)");

                entity.Property(e => e.Family).HasColumnType("text");

                entity.Property(e => e.Firstname).HasColumnType("varchar(40)");

                entity.Property(e => e.Gender)
                    .HasColumnType("int(1)")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.Googleid).HasColumnType("varchar(100)");

                entity.Property(e => e.Nationality).HasColumnType("varchar(40)");

                entity.Property(e => e.Nickname).HasColumnType("varchar(40)");

                entity.Property(e => e.Password).HasColumnType("varchar(100)");

                entity.Property(e => e.Phone).HasColumnType("varchar(40)");

                entity.Property(e => e.PhoneArea).HasColumnType("varchar(10)");

                entity.Property(e => e.Picture).HasColumnType("varchar(255)");

                entity.Property(e => e.Postcode).HasColumnType("varchar(20)");

                entity.Property(e => e.Subscribe)
                    .HasColumnType("tinyint(1)")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.Surname).HasColumnType("varchar(40)");

                entity.Property(e => e.Title).HasColumnType("varchar(20)");

                entity.Property(e => e.Wishlist).HasColumnType("varchar(255)");
            });
        }
    }
}
