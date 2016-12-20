using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
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
            //T ret = new T();
            var filter = Builders<T>.Filter.Eq("_id", id);
            var collection = Db.GetCollection<T>(CollectionName);
            var result = await collection.Find(filter).ToListAsync();
            //new BsonDocument() { { "_id", id } }
            return result.FirstOrDefault();
        }

        public async Task<T> Get(FilterDefinition<T> filter)
        {
            var collection = Db.GetCollection<T>(CollectionName);
            var result = await collection.Find<T>(filter).ToListAsync();
            return result.FirstOrDefault();
        }

        public async Task<T> Get(FilterDefinition<BsonDocument> filter)
        {
            var collection = Db.GetCollection<BsonDocument>(CollectionName);
            var resultCollection = await collection.Find<BsonDocument>(filter).ToListAsync();
            var result = resultCollection?.FirstOrDefault();
            if (result != null)
                return BsonSerializer.Deserialize<T>(result);
            else return null;
        }

        public async Task<T> Get(BsonDocument filter)
        {
            var collection = Db.GetCollection<BsonDocument>(CollectionName);
            var result= await collection.FindAsync<T>(filter);
            return result?.FirstOrDefault();
        }

        public async Task<IList<T>> GetCollection()
        {
            throw new NotImplementedException();
        }

        public async Task<IList<T>> GetCollection(FilterDefinition<BsonDocument> filter)
        {
            var collection = Db.GetCollection<BsonDocument>(CollectionName);
            var resultCollection = await collection.Find<BsonDocument>(filter).ToListAsync();
            return resultCollection.Select(p => BsonSerializer.Deserialize<T>(p)).ToList();
        }

        public async Task<IList<T>> GetCollection(FilterDefinition<T> filter)
        {
            var collection = Db.GetCollection<T>(CollectionName);
            var result = await collection.Find<T>(filter).ToListAsync();
            return result;
        }

        public async Task<IList<T>> GetCollection(BsonDocument filter)
        {
            var collection = Db.GetCollection<BsonDocument>(CollectionName);
            var result = await collection.FindAsync<T>(filter);
            return await result.ToListAsync();
        }
    }
}
