using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace Shiners.WebApp.Controllers.api
{
    [Produces("application/json")]
    [Route("api/Images")]
    public class ImagesController : Controller
    {
        public JObject Get(string id)
        {
            return new JObject();
        }
    }
}