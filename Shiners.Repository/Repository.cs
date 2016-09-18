using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Bson;


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
            db = client.GetDatabase("meteor");

            Images = new ImagesStore(db);
        }
        
        
        /*
        public void MongoDBConnect(string ConnectionString, string User, string Password)
        {
            var mongoUrlBuilder = new MongoUrlBuilder(ConnectionString);

            try
            {
                client = new MongoClient(mongoUrlBuilder.ToMongoUrl());
            }
            catch(Exception ex) 
            {

            }
            

            //MongoCredentials credentials = new MongoCredentials(User, Password);
            database = client.GetDatabase("meteor");
        }
        */
    }
}
