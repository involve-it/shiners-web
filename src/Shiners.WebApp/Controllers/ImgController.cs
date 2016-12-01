using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Kaliko.ImageLibrary;
using Kaliko.ImageLibrary.Scaling;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;

namespace Shiners.WebApp.Controllers
{
    public class ImgController : Controller
    {
        private IHostingEnvironment environment;

        public ImgController(IHostingEnvironment env)
        {
            environment = env;
        }

        public IActionResult Index(string url, int w, int h)
        {            
            try
            {
                
                string noimagePath = Path.Combine(environment.WebRootPath, "./images/no_image.png");
                var filestream=new MemoryStream();
                new KalikoImage(noimagePath).SavePng(filestream);
                return File(filestream, "image/png");
                //return new FileStreamResult(filestream, "image/png");
            }
            catch (Exception e)
            {
                string noimagePath = Path.Combine(environment.WebRootPath, "./images/no_image.png");
                return new FileContentResult(new KalikoImage(noimagePath).ByteArray, "image/png");
            }
            
        }
    }
}