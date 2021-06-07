using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace AuokkaPlatform.Models
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

        public virtual DbSet<Article> Article { get; set; }
        public virtual DbSet<Articletag> Articletag { get; set; }
        public virtual DbSet<Student> Student { get; set; }
        public virtual DbSet<Tag> Tag { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseMySql("Server=localhost;port=3306;Database=Auokka;username=root;password=root");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
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
        }
    }
}
