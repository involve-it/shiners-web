using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson.Serialization.Attributes;

namespace Shiners.Models.Domain
{
    //комментарии к постам(только текст)
    class Review : MeteorModel
    {
        //Id - поле _id в таблице reviews(ключевое поле)

        //UserId - поле userId в таблице messages, id пользователя оставившего комментарий
        [BsonElement("userId")]
        public string UserId { get; set; }
        //entityId - id поста к которому оставлен комментарий
        [BsonElement("entityId")]
        public string EntityId { get; set; }
        //dateTime - время когда оставлен комментарий
        [BsonElement("dateTime")]
        public double DateTime { get; set; }
        //text - текст комментария(в данный момент поддерживается только текстовый чат)
        [BsonElement("text")]
        public string Text { get; set; }
    }
}