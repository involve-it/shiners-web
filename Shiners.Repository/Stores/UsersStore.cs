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
    }
}
