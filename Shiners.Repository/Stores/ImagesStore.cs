using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shiners.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Bson.Serialization;
using Shiners.Models.Domain;

namespace Shiners.Repository.Stores
{
    public class ImagesStore
    {
        public static IMongoDatabase database;
        public ImagesStore(IMongoDatabase db)
        {
            database = db;
        }
        public static async Task<List<Image>> GetPhotos(string[] ids)
        {
            List<Image> ret = new List<Image>();
            var filter = Builders<BsonDocument>.Filter.In("_id", ids);
            var collection = database.GetCollection<BsonDocument>("images");
            using (var cursor = await collection.FindAsync(filter))
            {
                while (await cursor.MoveNextAsync())
                {
                    var images = cursor.Current;
                    foreach (var doc in images)
                    {
                        ret.Add(BsonSerializer.Deserialize<Image>(doc));
                    }
                }
            }
            
            return ret;
        }

        public static async Task<Image> GetPhoto(string id)
        {
            Image ret = new Image();
            var filter = Builders<BsonDocument>.Filter.Eq("_id", id);
            var collection = database.GetCollection<BsonDocument>("image");
            using (var cursor = await collection.FindAsync(filter))
            {
                while (await cursor.MoveNextAsync())
                {
                    var images = cursor.Current;
                    foreach (var doc in images)
                    {
                        ret = BsonSerializer.Deserialize<Image>(doc);
                    }
                }
            }
            return ret;
        }

    }
}
