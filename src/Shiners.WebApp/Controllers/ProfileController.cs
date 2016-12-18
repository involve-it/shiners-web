using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Shiners.WebApp.Controllers
{
    public class ProfileController : Controller
    {
        public IActionResult Index(string id = null)
        {


            return View("../Home/Index");
        }
    }
}