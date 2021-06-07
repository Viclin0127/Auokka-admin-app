using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using com.telstra.messaging.Api;
using com.telstra.messaging.Client;
using com.telstra.messaging.Model;
using Microsoft.Extensions.Configuration;

namespace AuokkaPlatform.Utility
{
    public class TxtUtil
    {
        public static bool SendSMS(string mobile, string content)
        {
            IConfiguration config = Utils.GetConfig();
            var clientId = config.GetSection("Telstrakey").Value;
            var clientSecret = config.GetSection("Telstrasecret").Value;
            var grantType = "client_credentials";  // (default to client_credentials)

            try
            {
                // Generate authentication token
                var authenticationApiInstance = new AuthenticationApi();
                System.Net.ServicePointManager.SecurityProtocol = System.Net.SecurityProtocolType.Tls12;
                OAuthResponse authResult = authenticationApiInstance.AuthToken(clientId, clientSecret, grantType);
                // set access token
                Configuration.Default.AccessToken = authResult.AccessToken;
                // provision
                var provisioningApiInstance = new ProvisioningApi();
                var body = new ProvisionNumberRequest();
                ProvisionNumberResponse provisionResult = provisioningApiInstance.CreateSubscription(body);

                // Send SMS Content
                SendSMSRequest payload = new SendSMSRequest(mobile, content);
                var messagingApiInstance = new MessagingApi();
                MessageSentResponse sendResult = messagingApiInstance.SendSMS(payload);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.StackTrace);
                return false;
            }
        }
    }
}
