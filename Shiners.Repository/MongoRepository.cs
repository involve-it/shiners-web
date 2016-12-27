using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Driver;
using Shiners.Repository.Stores;


namespace Shiners.Repository
{
    public class MongoRepository
    {
        public IMongoDatabase Database { get; protected set; }
        public UsersStore Users { get; protected set; }
        public PostsStore Posts { get; protected set; }
        public MongoRepository(string connectionString)
        {
            var client = new MongoClient(connectionString);           
            Database = client.GetDatabase("buzzar");
            Users=new UsersStore(Database,"users");
            Posts=new PostsStore(Database,"posts");
        }        
    }
}
