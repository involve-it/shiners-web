using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Shiners.WebApp.Controllers
{
    public class ChatsController : Controller
    {
        public IActionResult Index(string id = null)
        {
            return View("../Home/Index");
        }

        public IActionResult My()
        {
            return View("../Home/Index");
        }
    }
}