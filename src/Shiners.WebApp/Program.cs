using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.WebSockets;
using System.Threading.Tasks;
using DdpNet;
using Microsoft.AspNetCore.Hosting;

namespace Shiners.WebApp
{
    public class Program
    {
        public static MeteorClient Meteor;

        public static void Main(string[] args)
        {
            try
            {
                //Meteor = new MeteorClient(new Uri("wss://shiners.mobi/websocket"));
                //Meteor.ConnectAsync().Wait();
            }
            catch (Exception e)
            {
                Meteor = null;
            }
            var host = new WebHostBuilder()
                .UseKestrel()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseIISIntegration()
                .UseStartup<Startup>()
                .Build();

            host.Run();
        }
    }
}
