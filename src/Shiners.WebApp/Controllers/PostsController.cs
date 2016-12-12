using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DdpNet;
using Newtonsoft.Json.Linq;
using Shiners.WebApp.Renderers;

namespace Shiners.WebApp.Controllers
{
    //[RequireHttps]
    public class PostsController : Controller
    {
        private readonly UnderscoreRenderer Renderer;
        //private  MeteorClient Meteor;
        public PostsController(UnderscoreRenderer _renderer/*, MeteorClient _meteorClient*/)
        {
            Renderer = _renderer;
            //Meteor = _meteorClient;
        }

        public IActionResult Index(string id)
        {
            if(Program.Meteor==null)
                return View("Index");
            //obj.routeViewPath,obj.routeViewData,obj.routeViewTag,obj.routeViewHtmlAttrs
            JObject post;
            //Request.HttpContext.Connection.RemoteIpAddress
            //var popularPostsResult = await client.Call<JObject>("getPopularPosts", 55.755814, 37.617635, 200, 0, 10);

            //Meteor.ConnectAsync().Wait();
            var postResult = Program.Meteor.Call<JObject>("getPost", id).Result;
            //Meteor.Dispose();
            //Meteor = null;
            post = postResult["result"] as JObject;
            var routeViewPath = "~/homeApp/posts/DetailsView.hbs.html";
            var layoutPath = "~/homeApp/MainLayoutView.hbs.html";
            var data = new JObject()
                {
                    {"routeViewPath",routeViewPath },
                    {"routeViewTag","div" },
                    {"routeViewData",post }
                };
            var resp = Renderer.Render(layoutPath, data, "div", "id=\"wrapper\"");
            return View("Index", resp);
        }
        
        public IActionResult My()
        {
            return View("Index");
        }

        public IActionResult Create()
        {
            return View("Index");
        }
    }
}