using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MongoDB.Bson;


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


        // GET api/users/dfsfdsdf
        [HttpGet("{id}")]
        public async Task<BsonDocument> Get(string id)
        {
            var user = await _db.Users.GetBson(id);
            return user;
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
