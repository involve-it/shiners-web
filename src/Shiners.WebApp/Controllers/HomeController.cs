﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amazon.S3;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace Shiners.WebApp.Controllers
{
    //[RequireHttps]
    public class HomeController : Controller
    {
        public IActionResult Index()
        { 
            return View();
        }

        //public IActionResult About()
        //{
        //    return View("Index");
        //}

        public IActionResult HowItWorks()
        {
            return View("Index");
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View();
        }

        public IActionResult AppleAppSiteAssociation()
        {
            return File("~/apple-app-site-association", "application/json");
        }        
    }
}
