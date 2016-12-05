using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using Kaliko.ImageLibrary;
using Kaliko.ImageLibrary.Scaling;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using Shiners.WebApp.Util;

namespace Shiners.WebApp.Controllers
{
    public class ImgController : Controller
    {
        private IHostingEnvironment environment;

        public ImgController(IHostingEnvironment env)
        {
            environment = env;
        }
        public FileResult GetCaptchaImage(string url, int w, int h)
        {
            var img = new KalikoImage(url);
            MemoryStream stream = new MemoryStream();
            img.SaveJpg(stream,90);
            stream.Seek(0, SeekOrigin.Begin);
            return new FileStreamResult(stream, "image/jpg");
        }
        //[ResponseCache(Duration = 120,Location = ResponseCacheLocation.Any)]
        public FileResult Index(string url, int w, int h)
        {            
            try
            {
                if(string.IsNullOrWhiteSpace(url))
                    throw new NullReferenceException("url is null or empty");
                var img = new KalikoImage(url);
                img.Resize(w,h);
                MemoryStream stream = new MemoryStream();
                img.SavePng(stream);
                stream.Seek(0, SeekOrigin.Begin);
                //string extension = Path.GetExtension(url).Replace(",", "");
                return new FileStreamResult(stream, "image/Png");
            }
            catch (Exception e)
            {
                throw new Exception("crop image error",e);
                var img = new KalikoImage(Path.Combine(environment.WebRootPath, "./images/no_image.png"));
                img.Resize(w, h);
                MemoryStream stream = new MemoryStream();
                img.SavePng(stream, 50);
                stream.Seek(0, SeekOrigin.Begin);
                return new FileStreamResult(stream, "image/png");
            }          
        }
    }
}