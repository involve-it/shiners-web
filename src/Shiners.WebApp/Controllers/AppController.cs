using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amazon.S3;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace Shiners.WebApp.Controllers
{
    //[RequireHttps]
    public class AppController : Controller
    {
        public IActionResult Index()
        { 
            return View();
        }
    }
}
