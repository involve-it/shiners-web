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
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using Newtonsoft.Json.Linq;
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
            img.SaveJpg(stream, 90);
            stream.Seek(0, SeekOrigin.Begin);
            return new FileStreamResult(stream, "image/jpg");
        }

        [ResponseCache(Duration = 360, Location = ResponseCacheLocation.Any)]
        public FileResult Index(string url, int w, int h)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(url))
                    throw new NullReferenceException("url is null or empty");
                var img = new KalikoImage(url);
                if (img.Width > img.Height)
                {
                    float scaleIndex = (float) img.Height/h;
                    img.Resize((int) Math.Round(img.Width/scaleIndex, 0), h);
                    img.Crop((int) Math.Round((img.Width - w - 1)/2.0), 0, w, h);
                }
                else if (img.Width < img.Height)
                {
                    float scaleIndex = (float) img.Width/w;
                    img.Resize(w, (int) Math.Round(img.Height/scaleIndex, 0));
                    img.Crop(0, (int) Math.Round((img.Height - h - 1)/2.0), w, h);
                }
                else
                {
                    img.Resize(w, h);
                }
                MemoryStream stream = new MemoryStream();
                img.SavePng(stream);
                stream.Seek(0, SeekOrigin.Begin);
                return new FileStreamResult(stream, "image/Png");
            }
            catch (Exception e)
            {
                throw new Exception("Не удалось обработать изображение по адресу " + url, e);
                //var img = new KalikoImage(Path.Combine(environment.WebRootPath, "./images/no_image.png"));
                //img.Resize(w, h);
                //MemoryStream stream = new MemoryStream();
                //img.SavePng(stream, 50);
                //stream.Seek(0, SeekOrigin.Begin);
                //return new FileStreamResult(stream, "image/png");
            }
        }

        [HttpPost]
        public JObject UploadTempImage(string cid)
        {

            if (Request.Form.Files.Count > 0)
            {
                var file = Request.Form.Files[0];

                var extension = Path.GetExtension(file.FileName);
                var imgId = Guid.NewGuid();
                var fileName = "/images/temp/" + imgId + extension;
                var physicalPath = Path.Combine(environment.WebRootPath, "." + fileName);
                var file1 = System.IO.File.Create(physicalPath);
                file.CopyTo(file1);
                file1.Flush();
                file1.Close();
                return new JObject()
                {
                    {"path", fileName},
                    {"cid", cid},
                    {"name", imgId + extension}
                };
            }
            else
            {
                throw new Exception("Не удалось загрузить файл. Длина файла 0");
            }

        }

        [HttpPost]
        public JArray CommitUploadImage([FromBody]JToken data)
        {
            JArray jdata = JArray.FromObject(data);
            
            foreach (JObject jImg in jdata)
            {
                var physicalTempPath = Path.Combine(environment.WebRootPath, "." + jImg["data"]);
                var fileName = Path.GetFileName(physicalTempPath);
                var newFilePath = "/images/posts/userPhotos/" + fileName;
                var newPhysicalPath = Path.Combine(environment.WebRootPath, "." + newFilePath);
                try
                {
                    System.IO.File.Copy(physicalTempPath, newPhysicalPath);
                }
                catch (Exception e)
                {
                    throw new Exception("Не удалось записать файл",e);
                }
                try
                {
                    System.IO.File.Delete(physicalTempPath);
                }
                catch (Exception){}



                //jImg["id"]='dsdsd'
                jImg["data"] = newFilePath;
                //jImg["thumbnail"] = somePath;
            }
            return jdata;
        }

    }
}