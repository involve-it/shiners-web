using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Driver;
using Shiners.Models.Domain;

namespace Shiners.Repository.Stores
{
    public class UsersStore:BaseStore<User>
    {
        public UsersStore(IMongoDatabase db, string collectionName) : base(db, collectionName)
        {
        }

        public async Task<User> GetWithDetails(string id)
        {
            
            var user = await this.Get(id);
            var details =
                await Db.GetCollection<ProfileDetail>("profileDetails").FindSync((p) => p.UserId == id && p.Policy!="0").ToListAsync();
            user.ProfileDetails = details;
            return user;
        }
    }
}
