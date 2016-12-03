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
        public FileResult Index(string url, int w, int h)
        {            
            try
            {
                var img = new KalikoImage(url);
                img.Resize(50,50);
                MemoryStream stream = new MemoryStream();
                img.SaveJpg(stream, 90);
                stream.Seek(0, SeekOrigin.Begin);
                return new FileStreamResult(stream, "image/jpg");
                //var filestream=new MemoryStream(img.ByteArray);
                //var image = Image.FromStream(filestream);

                //var extension = Path.GetExtension(url);
                //return new FileStreamResult(filestream, "image/"+ extension.Replace(".",""))
                //{
                //   FileDownloadName = "Img"+Guid.NewGuid()+extension
                //};
                //return new FileStreamResult(filestream, "image/png");
            }
            catch (Exception e)
            {
                string noimagePath = Path.Combine(environment.WebRootPath, "./images/no_image.png");
                var filestream = new MemoryStream();
                new KalikoImage(noimagePath).SavePng(filestream);
                return new FileStreamResult(filestream, "image/png");
            }
            
        }
    }
}