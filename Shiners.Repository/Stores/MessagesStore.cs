using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Driver;
using Shiners.Models.Domain;

namespace Shiners.Repository.Stores
{
    public class MessagesStore:BaseStore<Message>
    {
        public MessagesStore(IMongoDatabase db, string collectionName) : base(db, collectionName)
        {
        }

        public async Task<IList<Message>>  GetChatsMessages(string userId)
        {
            return await this.GetCollection(p => p.UserId == userId);
        }
    }
}
