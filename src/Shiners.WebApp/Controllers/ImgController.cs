using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Kaliko.ImageLibrary;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;

namespace Shiners.WebApp.Controllers
{
    public class ImgController : Controller
    {
        public IActionResult Index(string url,int w,int h)
        {
            var image = new KalikoImage(url);
            image.Resize(w,h);
            //image.Scale()
            return new FileContentResult(image.ByteArray,"image/"+Path.GetExtension(url));
        }
    }
}