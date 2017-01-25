using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;


namespace Shiners.WebApp.Controllers
{
    public class BlogController : Controller
    {
        [Route("[controller]/")]
        public IActionResult Blog()
        {
            IList<Shiners.Models.Domain.Blog> model = new List<Shiners.Models.Domain.Blog>();

            return View("../Blog/Home", model);
        }

        [Route("[controller]/post")]
        public IActionResult BlogPost(string id)
        {
            return View("../Blog/Post");
        }
    }
}
