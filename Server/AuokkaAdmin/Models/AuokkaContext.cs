using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace AuokkaAdmin.Models
{
    public partial class AuokkaContext : DbContext
    {
        public AuokkaContext()
        {
        }

        public AuokkaContext(DbContextOptions<AuokkaContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Admin> Admin { get; set; }
        public virtual DbSet<Article> Article { get; set; }
        public virtual DbSet<Articletag> Articletag { get; set; }
        public virtual DbSet<Channel> Channel { get; set; }
        public virtual DbSet<Course> Course { get; set; }
        public virtual DbSet<Enrollment> Enrollment { get; set; }
        public virtual DbSet<Price> Price { get; set; }
        public virtual DbSet<Promotion> Promotion { get; set; }
        public virtual DbSet<Schedule> Schedule { get; set; }
        public virtual DbSet<Student> Student { get; set; }
        public virtual DbSet<Studentloginhistory> Studentloginhistory { get; set; }
        public virtual DbSet<Tag> Tag { get; set; }
        public virtual DbSet<Teacher> Teacher { get; set; }
        public virtual DbSet<Teacherloginhistory> Teacherloginhistory { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
// #warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseMySql("Server=localhost;port=3306;Database=Auokka;username=root;password=root");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Admin>(entity =>
            {
                entity.ToTable("admin");

                entity.HasIndex(e => e.Username)
                    .HasName("username_UNIQUE")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.CreateTime)
                    .HasColumnName("createTime")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("'CURRENT_TIMESTAMP'");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("password")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.UpdateTime)
                    .HasColumnName("updateTime")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("'CURRENT_TIMESTAMP'");

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasColumnName("username")
                    .HasColumnType("varchar(45)");
            });

            modelBuilder.Entity<Article>(entity =>
            {
                entity.ToTable("article");

                entity.HasIndex(e => e.AuthorId)
                    .HasName("FK_ARTICLE_STUDENT_idx");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Approved)
                    .HasColumnName("approved")
                    .HasColumnType("int(11)")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.AuthorId)
                    .HasColumnName("authorId")
                    .HasColumnType("int(11)");

                entity.Property(e => e.AuthorName)
                    .HasColumnName("authorName")
                    .HasColumnType("varchar(90)");

                entity.Property(e => e.CreateTime)
                    .HasColumnName("createTime")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("'CURRENT_TIMESTAMP'");

                entity.Property(e => e.Deleted)
                    .HasColumnName("deleted")
                    .HasColumnType("tinyint(4)")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.File)
                    .HasColumnName("file")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.ProposedTags)
                    .HasColumnName("proposedTags")
                    .HasColumnType("text");

                entity.Property(e => e.RejectReason)
                    .HasColumnName("rejectReason")
                    .HasColumnType("text");

                entity.Property(e => e.Show)
                    .HasColumnName("show")
                    .HasColumnType("tinyint(4)")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasColumnName("title")
                    .HasColumnType("varchar(100)");

                entity.HasOne(d => d.Author)
                    .WithMany(p => p.Article)
                    .HasForeignKey(d => d.AuthorId)
                    .HasConstraintName("FK_ARTICLE_STUDENT");
            });

            modelBuilder.Entity<Articletag>(entity =>
            {
                entity.ToTable("articletag");

                entity.HasIndex(e => e.ArticleId)
                    .HasName("FK_ARTICLEID_ARTAG_idx");

                entity.HasIndex(e => e.TagId)
                    .HasName("FK_TAGID_ARTAG_idx");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.ArticleId)
                    .HasColumnName("articleId")
                    .HasColumnType("int(11)");

                entity.Property(e => e.TagId)
                    .HasColumnName("tagId")
                    .HasColumnType("int(11)");

                entity.HasOne(d => d.Article)
                    .WithMany(p => p.Articletag)
                    .HasForeignKey(d => d.ArticleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ARTICLEID_ARTAG");

                entity.HasOne(d => d.Tag)
                    .WithMany(p => p.Articletag)
                    .HasForeignKey(d => d.TagId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TAGID_ARTAG");
            });

            modelBuilder.Entity<Channel>(entity =>
            {
                entity.ToTable("channel");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.CreateTime)
                    .HasColumnName("createTime")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("'CURRENT_TIMESTAMP'");

                entity.Property(e => e.Name)
                    .HasColumnName("name")
                    .HasColumnType("varchar(45)");
            });

            modelBuilder.Entity<Course>(entity =>
            {
                entity.ToTable("course");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Active)
                    .HasColumnName("active")
                    .HasColumnType("tinyint(4)")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.CreateTime)
                    .HasColumnName("createTime")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("'CURRENT_TIMESTAMP'");

                entity.Property(e => e.Deleted)
                    .HasColumnName("deleted")
                    .HasColumnType("tinyint(4)")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.Description)
                    .HasColumnName("description")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.Detail)
                    .HasColumnName("detail")
                    .HasColumnType("text");

                entity.Property(e => e.Image)
                    .HasColumnName("image")
                    .HasColumnType("text");

                entity.Property(e => e.Level)
                    .HasColumnName("level")
                    .HasColumnType("varchar(45)");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasColumnType("varchar(45)");

                entity.Property(e => e.UpdateTime)
                    .HasColumnName("updateTime")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("'CURRENT_TIMESTAMP'");
            });

            modelBuilder.Entity<Enrollment>(entity =>
            {
                entity.ToTable("enrollment");

                entity.HasIndex(e => e.ScheduleId)
                    .HasName("FK_ENROL_SCHEDULE_idx");

                entity.HasIndex(e => e.StudentId)
                    .HasName("FK_ENROL_STUDENT_idx");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Active)
                    .HasColumnName("active")
                    .HasColumnType("tinyint(4)")
                    .HasDefaultValueSql("'1'");

                entity.Property(e => e.CreateTime)
                    .HasColumnName("createTime")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("'CURRENT_TIMESTAMP'");

                entity.Property(e => e.Deleted)
                    .HasColumnName("deleted")
                    .HasColumnType("tinyint(4)")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.EnrolBirthDate)
                    .HasColumnName("enrolBirthDate")
                    .HasColumnType("date");

                entity.Property(e => e.EnrolEmail)
                    .HasColumnName("enrolEmail")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.EnrolFirstname)
                    .HasColumnName("enrolFirstname")
                    .HasColumnType("varchar(45)");

                entity.Property(e => e.EnrolPhone)
                    .HasColumnName("enrolPhone")
                    .HasColumnType("varchar(45)");

                entity.Property(e => e.EnrolSchool)
                    .HasColumnName("enrolSchool")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.EnrolSurname)
                    .HasColumnName("enrolSurname")
                    .HasColumnType("varchar(45)");

                entity.Property(e => e.Fee)
                    .HasColumnName("fee")
                    .HasColumnType("decimal(10,0)")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.Paid)
                    .HasColumnName("paid")
                    .HasColumnType("tinyint(4)")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.ScheduleId)
                    .HasColumnName("scheduleId")
                    .HasColumnType("int(11)");

                entity.Property(e => e.StudentId)
                    .HasColumnName("studentId")
                    .HasColumnType("int(11)");

                entity.Property(e => e.UpdateTime)
                    .HasColumnName("updateTime")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("'CURRENT_TIMESTAMP'");

                entity.HasOne(d => d.Schedule)
                    .WithMany(p => p.Enrollment)
                    .HasForeignKey(d => d.ScheduleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ENROL_SCHEDULE");

                entity.HasOne(d => d.Student)
                    .WithMany(p => p.Enrollment)
                    .HasForeignKey(d => d.StudentId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ENROL_STUDENT");
            });

            modelBuilder.Entity<Price>(entity =>
            {
                entity.ToTable("price");

                entity.HasIndex(e => e.ScheduleId)
                    .HasName("FK_PRICE_SCHEDULE_idx");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Active)
                    .HasColumnName("active")
                    .HasColumnType("tinyint(4)")
                    .HasDefaultValueSql("'1'");

                entity.Property(e => e.Amount)
                    .HasColumnName("amount")
                    .HasColumnType("decimal(10,0)");

                entity.Property(e => e.CreateTime)
                    .HasColumnName("createTime")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("'CURRENT_TIMESTAMP'");

                entity.Property(e => e.Deleted)
                    .HasColumnName("deleted")
                    .HasColumnType("tinyint(4)")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.Description)
                    .HasColumnName("description")
                    .HasColumnType("varchar(45)");

                entity.Property(e => e.ScheduleId)
                    .HasColumnName("scheduleId")
                    .HasColumnType("int(11)");

                entity.Property(e => e.UpdateTime)
                    .HasColumnName("updateTime")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("'CURRENT_TIMESTAMP'");

                entity.HasOne(d => d.Schedule)
                    .WithMany(p => p.Price)
                    .HasForeignKey(d => d.ScheduleId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_PRICE_SCHEDULE");
            });

            modelBuilder.Entity<Promotion>(entity =>
            {
                entity.ToTable("promotion");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Code)
                    .HasColumnName("code")
                    .HasColumnType("varchar(45)");

                entity.Property(e => e.CreateTime)
                    .HasColumnName("createTime")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("'CURRENT_TIMESTAMP'");

                entity.Property(e => e.Description)
                    .HasColumnName("description")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.Expired)
                    .HasColumnName("expired")
                    .HasColumnType("datetime");

                entity.Property(e => e.Source)
                    .HasColumnName("source")
                    .HasColumnType("varchar(45)");
            });

            modelBuilder.Entity<Schedule>(entity =>
            {
                entity.ToTable("schedule");

                entity.HasIndex(e => e.CourseId)
                    .HasName("FK_SCHEDULE_COURSE_idx");

                entity.HasIndex(e => e.DefaultPriceId)
                    .HasName("FK_SCHEDULE_PRICE_idx");

                entity.HasIndex(e => e.TeacherId)
                    .HasName("FK_SCHEDULE_TEACHER_idx");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Active)
                    .HasColumnName("active")
                    .HasColumnType("tinyint(4)")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.CourseId)
                    .HasColumnName("courseId")
                    .HasColumnType("int(11)");

                entity.Property(e => e.CreateTime)
                    .HasColumnName("createTime")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("'CURRENT_TIMESTAMP'");

                entity.Property(e => e.DefaultPriceId)
                    .HasColumnName("defaultPriceId")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Deleted)
                    .HasColumnName("deleted")
                    .HasColumnType("tinyint(4)")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.Duration)
                    .HasColumnName("duration")
                    .HasColumnType("varchar(45)");

                entity.Property(e => e.From)
                    .HasColumnName("from")
                    .HasColumnType("date");

                entity.Property(e => e.Location)
                    .HasColumnName("location")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.TeacherId)
                    .HasColumnName("teacherId")
                    .HasColumnType("int(11)");

                entity.Property(e => e.To)
                    .HasColumnName("to")
                    .HasColumnType("date");

                entity.Property(e => e.UpdateTime)
                    .HasColumnName("updateTime")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("'CURRENT_TIMESTAMP'");

                entity.HasOne(d => d.Course)
                    .WithMany(p => p.Schedule)
                    .HasForeignKey(d => d.CourseId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SCHEDULE_COURSE");

                entity.HasOne(d => d.DefaultPrice)
                    .WithMany(p => p.ScheduleNavigation)
                    .HasForeignKey(d => d.DefaultPriceId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SCHEDULE_PRICE");

                entity.HasOne(d => d.Teacher)
                    .WithMany(p => p.Schedule)
                    .HasForeignKey(d => d.TeacherId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_SCHEDULE_TEACHER");
            });

            modelBuilder.Entity<Student>(entity =>
            {
                entity.ToTable("student");

                entity.HasIndex(e => e.Email)
                    .HasName("email_UNIQUE")
                    .IsUnique();

                entity.HasIndex(e => e.Mobile)
                    .HasName("mobile_UNIQUE")
                    .IsUnique();

                entity.HasIndex(e => e.Username)
                    .HasName("username_UNIQUE")
                    .IsUnique();

                entity.HasIndex(e => e.ValidationCode)
                    .HasName("validationCode_UNIQUE")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Active)
                    .HasColumnName("active")
                    .HasColumnType("tinyint(4)")
                    .HasDefaultValueSql("'1'");

                entity.Property(e => e.BirthDate)
                    .HasColumnName("birthDate")
                    .HasColumnType("date");

                entity.Property(e => e.CreateTime)
                    .HasColumnName("createTime")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("'CURRENT_TIMESTAMP'");

                entity.Property(e => e.Deleted)
                    .HasColumnName("deleted")
                    .HasColumnType("tinyint(4)")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.Firstname)
                    .HasColumnName("firstname")
                    .HasColumnType("varchar(45)");

                entity.Property(e => e.Image)
                    .HasColumnName("image")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.LastLogin)
                    .HasColumnName("lastLogin")
                    .HasColumnType("datetime");

                entity.Property(e => e.Mobile)
                    .HasColumnName("mobile")
                    .HasColumnType("varchar(45)");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("password")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.School)
                    .HasColumnName("school")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.SigninCode)
                    .HasColumnName("signinCode")
                    .HasColumnType("varchar(8)");

                entity.Property(e => e.SigninCodeExpired)
                    .HasColumnName("signinCodeExpired")
                    .HasColumnType("datetime");

                entity.Property(e => e.Surname)
                    .HasColumnName("surname")
                    .HasColumnType("varchar(45)");

                entity.Property(e => e.Token)
                    .HasColumnName("token")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.TokenExpiry)
                    .HasColumnName("tokenExpiry")
                    .HasColumnType("datetime");

                entity.Property(e => e.UpdateTime)
                    .HasColumnName("updateTime")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("'CURRENT_TIMESTAMP'");

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasColumnName("username")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.Validated)
                    .HasColumnName("validated")
                    .HasColumnType("tinyint(4)")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.ValidationCode)
                    .HasColumnName("validationCode")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.Wechat)
                    .HasColumnName("wechat")
                    .HasColumnType("varchar(100)");
            });

            modelBuilder.Entity<Studentloginhistory>(entity =>
            {
                entity.HasKey(e => new { e.Time, e.StudentId });

                entity.ToTable("studentloginhistory");

                entity.HasIndex(e => e.StudentId)
                    .HasName("FK_TLH_STUDENT_idx");

                entity.Property(e => e.Time)
                    .HasColumnName("time")
                    .HasColumnType("datetime");

                entity.Property(e => e.StudentId)
                    .HasColumnName("studentId")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Ip)
                    .HasColumnName("ip")
                    .HasColumnType("varchar(100)");

                entity.HasOne(d => d.Student)
                    .WithMany(p => p.Studentloginhistory)
                    .HasForeignKey(d => d.StudentId)
                    .HasConstraintName("FK_SLH_STUDENT");
            });

            modelBuilder.Entity<Tag>(entity =>
            {
                entity.ToTable("tag");

                entity.HasIndex(e => e.TagId)
                    .HasName("FK_TAG_TAGID_idx");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Deleted)
                    .HasColumnName("deleted")
                    .HasColumnType("tinyint(4)")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasColumnType("varchar(45)");

                entity.Property(e => e.TagId)
                    .HasColumnName("tagId")
                    .HasColumnType("int(11)");

                entity.HasOne(d => d.TagNavigation)
                    .WithMany(p => p.InverseTagNavigation)
                    .HasForeignKey(d => d.TagId)
                    .HasConstraintName("FK_TAG_TAGID");
            });

            modelBuilder.Entity<Teacher>(entity =>
            {
                entity.ToTable("teacher");

                entity.HasIndex(e => e.Email)
                    .HasName("email_UNIQUE")
                    .IsUnique();

                entity.HasIndex(e => e.Username)
                    .HasName("username_UNIQUE")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Active)
                    .HasColumnName("active")
                    .HasColumnType("tinyint(4)")
                    .HasDefaultValueSql("'1'");

                entity.Property(e => e.CreateTime)
                    .HasColumnName("createTime")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("'CURRENT_TIMESTAMP'");

                entity.Property(e => e.Deleted)
                    .HasColumnName("deleted")
                    .HasColumnType("tinyint(4)")
                    .HasDefaultValueSql("'1'");

                entity.Property(e => e.Description)
                    .HasColumnName("description")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.Firstname)
                    .IsRequired()
                    .HasColumnName("firstname")
                    .HasColumnType("varchar(45)");

                entity.Property(e => e.Image)
                    .HasColumnName("image")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.LastLogin)
                    .HasColumnName("lastLogin")
                    .HasColumnType("datetime");

                entity.Property(e => e.Mobile)
                    .HasColumnName("mobile")
                    .HasColumnType("varchar(45)");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("password")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.Surname)
                    .IsRequired()
                    .HasColumnName("surname")
                    .HasColumnType("varchar(45)");

                entity.Property(e => e.Title)
                    .HasColumnName("title")
                    .HasColumnType("varchar(45)");

                entity.Property(e => e.Token)
                    .HasColumnName("token")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.TokenExpiry)
                    .HasColumnName("tokenExpiry")
                    .HasColumnType("datetime");

                entity.Property(e => e.UpdateTime)
                    .HasColumnName("updateTime")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("'CURRENT_TIMESTAMP'");

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasColumnName("username")
                    .HasColumnType("varchar(255)");
            });

            modelBuilder.Entity<Teacherloginhistory>(entity =>
            {
                entity.HasKey(e => new { e.Time, e.TeacherId });

                entity.ToTable("teacherloginhistory");

                entity.HasIndex(e => e.TeacherId)
                    .HasName("FK_TLH_TEACHER_idx");

                entity.Property(e => e.Time)
                    .HasColumnName("time")
                    .HasColumnType("datetime");

                entity.Property(e => e.TeacherId)
                    .HasColumnName("teacherId")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Ip)
                    .HasColumnName("ip")
                    .HasColumnType("varchar(100)");

                entity.HasOne(d => d.Teacher)
                    .WithMany(p => p.Teacherloginhistory)
                    .HasForeignKey(d => d.TeacherId)
                    .HasConstraintName("FK_TLH_TEACHER");
            });
        }
    }
}
