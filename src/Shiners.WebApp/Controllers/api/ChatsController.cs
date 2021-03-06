﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Shiners.Models.Domain;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Shiners.WebApp.Controllers.api
{
    [Route("api/[controller]")]
    public class ChatsController : Controller
    {
        private Repository.MongoRepository _db;

        public ChatsController(Repository.MongoRepository repository)
        {
            _db = repository;
        }
        
        [HttpGet("{userId}")]
        public async Task<IList<Chat>> GetMyChats(string userId)
        {
            return await _db.Chats.GetMy(userId);
            //return await _db.Posts.GetMy(userId);
        }

        [HttpGet("hasPost")]
        public async Task<bool> HasUserPost([FromQuery] string userId, [FromQuery] string postId)
        {
            return await _db.Posts.HasUserPost(userId, postId);
        }
    }
}
