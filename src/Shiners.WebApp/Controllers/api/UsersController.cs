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
        private Repository.MongoRepository _db;

        public UsersController(Repository.MongoRepository repository)
        {
            _db = repository;
        }

        // GET: api/values
        [HttpGet]
        public JArray Get()
        {
            
            return new JArray();
        }

        // GET api/users/dfsfdsdf
        [HttpGet("{id}")]
        public async Task<object> Get(string id)
        {
            var user = await _db.Users.Get(id);
            if (user != null)
            {
                return user.ToJObject();
            }
            else
            {
                return NotFound();
            }
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
