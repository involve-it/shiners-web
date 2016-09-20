using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Bson;
using Shiners.Repository.Stores;


namespace Shiners.Repository
{
    public class Repository
    {
        private MongoClient client;

        public IMongoDatabase database;
        public ImagesStore Images { get; private set; }

        public Repository()
        {
            string connectionString = "mongodb://localhost:3001";
            MongoClient client = new MongoClient(connectionString);
            database = client.GetDatabase("meteor");

            Images = new ImagesStore(database);
            
        }
        
    }
}
