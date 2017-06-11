using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Shiners.WebApp.Controllers
{
    //[RequireHttps]
    public class AboutController : Controller
    {
        public IActionResult About()
        {
            return View("Index");
        }

        public IActionResult MassMedia()
        {
            return View("Index");
        }

        public IActionResult AppRedirect()
        {
            return View("Index");
        }
    }
}