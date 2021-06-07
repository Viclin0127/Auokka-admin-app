using AuokkaPlatform.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace AuokkaPlatform
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        //Scaffold-DbContext "Server=localhost;port=3306;Database=Auokka;username=root;password=root" pomelo.entityframeworkcore.mysql -OutputDir Models -Force -t article,articletag,student,tag
        //Scaffold-DbContext "Server=119.9.52.195;port=3306;Database=staging_equitycdb_tour;username=stdev;password=nGeQBY" pomelo.entityframeworkcore.mysql -OutputDir Eqtytour -Force -t web_customer
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "AuokkaPlatform/dist";
            });
            string dbLocation = Configuration.GetSection("db").GetSection("Location").Value;
            string database = Configuration.GetSection("db").GetSection("Database").Value;
            string port = Configuration.GetSection("db").GetSection("Port").Value;
            string username = Configuration.GetSection("db").GetSection("Username").Value;
            string password = Configuration.GetSection("db").GetSection("Password").Value;
            services.AddDbContext<AuokkaContext>(
                options => options.UseMySql("Server=" + dbLocation + ";port=" + port + ";Database=" + database + ";username=" + username + ";password=" + password + ";TreatTinyAsBoolean=false;"));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "AuokkaPlatform";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
