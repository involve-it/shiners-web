using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using Shiners.Models.Domain;

namespace Shiners.Repository.Stores
{
    public class BaseStore<T>: IStore<T> where T : MeteorModel
    {
        protected readonly IMongoDatabase Db;
        protected readonly string CollectionName;
        public BaseStore(IMongoDatabase db,string collectionName)
        {
            CollectionName = collectionName;
            Db = db;
        }

        public async Task<T>  Get(string id)
        {
            return await Db.GetCollection<T>(CollectionName).FindSync((p) => p.Id == id).FirstOrDefaultAsync();
        }

        public async Task<T> Get(Expression<Func<T, bool>> filter)
        {
            var collection = Db.GetCollection<T>(CollectionName);
            var result = await collection.Find<T>(filter).ToListAsync();
            return result.FirstOrDefault();
        }

        public async Task<IList<T>> GetCollection()
        {
            throw new NotImplementedException();
        }

        public async Task<IList<T>> GetCollection(Expression<Func<T,bool>> filter)
        {
            var collection = Db.GetCollection<T>(CollectionName);
            var result = await collection.Find<T>(filter).ToListAsync();
            return result;
        }

        public async Task<BsonDocument> GetBson(string id)
        {
            var filter = Builders<BsonDocument>.Filter.Eq("_id", id);
            var collection = Db.GetCollection<BsonDocument>(CollectionName);
            var result = await collection.Find(filter).ToListAsync();
            //new BsonDocument() { { "_id", id } }
            return result.FirstOrDefault();
        }
        
    }
}
