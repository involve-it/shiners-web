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
    public class PostsController : Controller
    {
        private UnderscoreRenderer Renderer { get;  set; }
        public PostsController(UnderscoreRenderer _renderer)
        {
            Renderer = _renderer;
        }

        public async Task<IActionResult> Index(string id)
        {
            //obj.routeViewPath,obj.routeViewData,obj.routeViewTag,obj.routeViewHtmlAttrs
            JObject post;
            using (MeteorClient client = new MeteorClient(new Uri("wss://shiners.mobi/websocket")))
            {
               await client.ConnectAsync();
                
                //Request.HttpContext.Connection.RemoteIpAddress
                //var popularPostsResult = await client.Call<JObject>("getPopularPosts", 55.755814, 37.617635, 200, 0, 10);
                var postResult = client.Call<JObject>("getPost", id).Result;
                post = postResult["result"] as JObject;
                
            }
            var routeViewPath = "~/homeApp/posts/DetailsView.hbs.html";
            var layoutPath = "~/homeApp/MainLayoutView.hbs.html";
            var data = new JObject()
                {
                    {"routeViewPath",routeViewPath },
                    {"routeViewTag","div" },
                    {"routeViewHtmlAttrs",null },
                    {"routeViewData",post }
                };
            var resp = Renderer.Render(layoutPath, data, "div", "id=\"wrapper\"");
            return View("../Home/Index", resp);
        }
        
        public IActionResult My()
        {
            return View("../Home/Index");
        }
    }
}