using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;
using System;

namespace Shiners.Models.Domain
{
    public class Blog
    {
        public Blog()
        {
            
        }
        [BsonElement("_id")]
        public Guid Id { get; set; }
        [BsonElement("title")]
        public string Title { get; set; }
        [BsonElement("tags")]
        public IList<string> Tags { get; set; }
        [BsonElement("body")]
        public string Body { get; set; }
        [BsonElement("publishedAt")]
        public DateTime PublishedAt { get; set; }
    }
}