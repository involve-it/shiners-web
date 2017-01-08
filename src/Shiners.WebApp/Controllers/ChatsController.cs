using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Shiners.WebApp.Controllers
{
    //[RequireHttps]
    public class ChatsController : Controller
    {
        public IActionResult Index(string id = null)
        {
            return View("../Chats/My");
        }

        public IActionResult My()
        {
            return View("../Chats/My");
        }

        public ActionResult To(string id)
        {
            return View("../Home/Index");
        }
    }
}