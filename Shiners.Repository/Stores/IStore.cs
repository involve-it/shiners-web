using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;
using Shiners.Models.Domain;

namespace Shiners.Repository.Stores
{
    interface IStore<T> where T : MeteorModel
    {
        Task<T> Get(string id);
        Task<T> Get(FilterDefinition<T> filter);
        Task<T> Get(FilterDefinition<BsonDocument> filter);
        Task<T> Get(BsonDocument filter);
        Task<IList<T>> GetCollection();
        Task<IList<T>> GetCollection(FilterDefinition<BsonDocument> filter );
        Task<IList<T>> GetCollection(FilterDefinition<T> filter);
        Task<IList<T>> GetCollection(BsonDocument filter);
    }

}
