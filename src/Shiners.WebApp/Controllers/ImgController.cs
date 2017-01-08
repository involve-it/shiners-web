using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using Amazon.S3;
using Amazon.S3.Model;
using Kaliko.ImageLibrary;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace Shiners.WebApp.Controllers
{
    public class ImgController : Controller
    {
        private IHostingEnvironment environment;
        private IAmazonS3 S3Client;
        [NonAction]
        private void _cropImage(KalikoImage img, int w, int h)
        {
            if (img.Width > img.Height)
            {
                float scaleIndex = (float)img.Height / h;
                img.Resize((int)Math.Round(img.Width / scaleIndex, 0), h);
                img.Crop((int)Math.Round((img.Width - w - 1) / 2.0), 0, w, h);
            }
            else if (img.Width < img.Height)
            {
                float scaleIndex = (float)img.Width / w;
                img.Resize(w, (int)Math.Round(img.Height / scaleIndex, 0));
                img.Crop(0, (int)Math.Round((img.Height - h - 1) / 2.0), w, h);
            }
            else
            {
                img.Resize(w, h);
            }         
        }

        public ImgController(IHostingEnvironment env, IAmazonS3 s3Client)
        {
            environment = env;
            S3Client = s3Client;
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
                _cropImage(img, w, h);
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
        public JArray UploadTempImage()
        {
            if (Request.Form.Files.Count > 0)
            {
                var resp = new JArray();
                foreach (var file in Request.Form.Files)
                {
                    // var extension = Path.GetExtension(file.FileName);
                    var stream = file.OpenReadStream();
                    byte[] bufer = new byte[file.Length];
                    stream.Read(bufer, 0, (int) file.Length);
                    string base64 = Convert.ToBase64String(bufer);
                    resp.Add(new JObject()
                    {
                        {"data", base64},
                        {"id", file.FileName}
                    });
                }
                return resp;
            }
            else
            {
                throw new Exception("Не удалось загрузить файл. Длина файла 0");
            }
            //{"data",$"data:image/{extension.Replace(".","")};base64,{base64}" },
        }

        [HttpPost]
        public async Task<JArray> CommitUploadImage([FromBody] JToken data)
        {
            JArray jdata = JArray.FromObject(data);
            foreach (JObject jImg in jdata)
            {
                var key = Guid.NewGuid().ToString();
                string base64 = jImg["data"].ToObject<string>();
                string imageType = jImg["type"].ToString();
                string name = jImg["name"].ToString();
                byte[] bytes = Convert.FromBase64String(base64);              
                var imgStream = new MemoryStream(bytes);
                // create thumbnail
                var thumbnail = new KalikoImage(imgStream);
                _cropImage(thumbnail, 70, 70);
                MemoryStream thumbnailStream = new MemoryStream();
                thumbnail.SavePng(thumbnailStream);
                try
                {
                    await S3Client.PutObjectAsync(new PutObjectRequest
                    {
                        BucketName = "shiners/v1.0/public/images",
                        Key = key,
                        InputStream = imgStream,
                        ContentType = imageType
                    });
                    await S3Client.PutObjectAsync(new PutObjectRequest
                    {
                        BucketName = "shiners/v1.0/public/images",
                        Key = "thumbnail_"+key,
                        InputStream = thumbnailStream,
                        ContentType = imageType
                    });
                    jImg.Remove("id");
                    jImg["name"] = name;
                    jImg["data"] = "https://s3.amazonaws.com/shiners/v1.0/public/images/" +key;
                    jImg["thumbnail"] = "https://s3.amazonaws.com/shiners/v1.0/public/images/" + "thumbnail_" + key;
                }
                catch (Exception e)
                {                    
                    throw e;
                }               
            }
            return jdata;
        }
    }
}