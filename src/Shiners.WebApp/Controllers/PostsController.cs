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
            
            MeteorClient client = new MeteorClient(new Uri("wss://shiners.mobi/websocket"));
            await client.ConnectAsync();
            var post = client.Call<JObject>("getPost",id);
            var result = await client.Call<JObject>("getPopularPosts", 55.755814, 37.617635, 200, 0, 10);
            return View("../Home/Index");
        }
        
        public IActionResult My()
        {
            return View("../Home/Index");
        }
    }
}