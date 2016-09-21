using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Driver;
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
            string connectionString = "mongodb://buzzar:qwerty!123@109.230.131.241:27017/Buzzar";
            MongoClient client = new MongoClient(connectionString);
            
            database = client.GetDatabase("Buzzar");
            Images = new ImagesStore(database);          
        }        
    }
}
