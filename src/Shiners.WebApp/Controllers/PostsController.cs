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
            using (MeteorClient client = new MeteorClient(new Uri("wss://shiners.mobi/websocket")))
            {
                await client.ConnectAsync();
                //Request.HttpContext.Connection.RemoteIpAddress
                //var popularPostsResult = await client.Call<JObject>("getPopularPosts", 55.755814, 37.617635, 200, 0, 10);
                var postResult = await client.Call<JObject>("getPost", id);
                JObject post = postResult["result"] as JObject;
                var routeViewPath = "~/homeApp/posts/DetailsView.hbs.html";
                var layoutPath = "~/homeApp/MainLayoutView.hbs.html";
                var data = new JObject()
                {
                    {"routeViewPath",routeViewPath },
                    {"routeViewTag","div" },
                    {"routeViewHtmlAttrs",null },
                    {"routeViewData",post }
                };
                
                return View("../Home/Index", Renderer.Render(layoutPath, data, "div", "id=\"wrapper\""));
            }
        }
        
        public IActionResult My()
        {
            return View("../Home/Index");
        }
    }
}