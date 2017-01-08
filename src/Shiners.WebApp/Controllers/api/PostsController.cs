using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Shiners.Models.Domain;

namespace Shiners.WebApp.Controllers.api
{
    [Route("api/[controller]")]
    public class PostsController : Controller
    {
        private Repository.MongoRepository _db;

        public PostsController(Repository.MongoRepository repository)
        {
            _db = repository;
        }
        
        [HttpGet("{userId}")]
        public async Task<IList<Post>> GetMyPosts(string userId)
        {
            return await _db.Posts.GetMy(userId);
        }

        [HttpGet("hasPost")]
        public async Task<bool> HasUserPost([FromQuery] string userId, [FromQuery] string postId)

        {
            return await _db.Posts.HasUserPost(userId, postId);
        }
    }
}
