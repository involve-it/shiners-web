using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
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
            Meteor = new MeteorClient(new Uri("wss://shiners.mobi/websocket"));
            Meteor.ConnectAsync().Wait();
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
