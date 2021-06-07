using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace AuokkaPlatform.Utility
{
    public class EmailUtil
    {
        public string Server { get; set; }
        public string Port { get; set; }
        public string CredentialUsername { get; set; }
        public string CredentialPassword { get; set; }

        public MailAddress From { get; set; }
        public List<MailAddress> To { get; set; }

        public SmtpClient Client { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }

        public bool IsHtmlFormat = true;

        public EmailUtil()
        {
            IConfiguration configuration = Utils.GetConfig();
            Server = configuration.GetSection("MailServer").GetSection("EmailServer").Value;
            CredentialUsername = configuration.GetSection("MailServer").GetSection("MailServerLogin").Value;
            Port = configuration.GetSection("MailServer").GetSection("Port").Value;
            CredentialPassword = configuration.GetSection("MailServer").GetSection("MailServerPassword").Value;
            From = new MailAddress(CredentialUsername, configuration.GetSection("MailServer").GetSection("MailServerFromName").Value);
            To = new List<MailAddress>();
        }

        public EmailUtil AddMailAddress(string address)
        {
            To.Add(new MailAddress(address));
            return this;
        }

        public EmailUtil SetSubject(string subject)
        {
            Subject = subject;
            return this;
        }

        public EmailUtil SetBody(string body)
        {
            Body = body;
            return this;
        }

        public EmailUtil IsHtml()
        {
            IsHtmlFormat = true;
            return this;
        }

        public EmailUtil IsNotHtml()
        {
            IsHtmlFormat = false;
            return this;
        }

        public void Send()
        {
            using (MailMessage emailMessage = new MailMessage())
            {
                emailMessage.From = From;
                foreach (MailAddress ma in To)
                {
                    emailMessage.To.Add(ma);
                }
                emailMessage.Subject = Subject;
                emailMessage.Body = Body;
                emailMessage.Priority = MailPriority.Normal;
                emailMessage.IsBodyHtml = IsHtmlFormat;
                using (SmtpClient MailClient = new SmtpClient(Server, Convert.ToInt32(Port)))
                {
                    MailClient.EnableSsl = true;
                    MailClient.Credentials = new System.Net.NetworkCredential(CredentialUsername, CredentialPassword);
                    MailClient.Send(emailMessage);
                }
            }
        }

    }
}

