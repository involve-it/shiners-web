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
        private static async Task<List<Image>> GetPhotos(string[] idFind)
        {
            
            List<Image> ret = new List<Image>();
            var filter = Builders<BsonDocument>.Filter.In("_id", idFind);
            var collection = ("images");
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

    }
}
