using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Shiners.WebApp.Controllers.api
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        // GET: api/values
        [HttpGet]
        public JArray Get()
        {
            return new JArray();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public JObject Get(string id)
        {
            return null;
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
