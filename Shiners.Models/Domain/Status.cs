using MongoDB.Bson.Serialization.Attributes;

namespace Shiners.Models.Domain
{
    public class Status
    {
        public Status()
        {
            Lastlogin = new Lastlogin();
        }

        public Status(bool online, Lastlogin lastlogin, bool idle)
        {
            this.Online = online;
            this.Lastlogin = lastlogin;
            this.Idle = idle;
        }
        [BsonElement("online")]
        public bool Online { get; set; }
        [BsonElement("idle")]
        public bool Idle { get; set; }
        [BsonElement("lastLogin")]
        public Lastlogin Lastlogin { get; set; }
    }
}