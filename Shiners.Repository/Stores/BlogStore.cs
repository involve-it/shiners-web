using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Driver;
using Shiners.Models.Domain;

namespace Shiners.Repository.Stores
{
    public class BlogsStore:BaseStore<Post>
    {
        public BlogsStore(IMongoDatabase db, string collectionName) : base(db, collectionName)
        {
        }

        public async Task<IList<Post>>  GetPosts(string userId)
        {
            return await this.GetCollection();
        }

        public async Task<bool> GetPostById(string postId)
        {
            var result = await this.Get(p => p.Id == postId);
            return result != null;
        }

    }
}
