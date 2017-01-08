using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson.Serialization.Attributes;

namespace Shiners.Models.Domain
{
    //таблица хранящая сообщения используется в чатах и для notifications
    public class Message:MeteorModel
    {
        //UserId - поле userId в таблице messages, id пользователя отправаителя сообщения
        [BsonElement("userId")]
        public string UserId { get; set; }
        //ToUserId - id пользователя получателя
        [BsonElement("toUserId")]
        public string ToUserId { get; set; }
        //ChatId - id-чата к которому относится сообщение
        [BsonElement("chatId")]
        public string ChatId { get; set; }
        //text - текст сообщения(в данный момент поддерживается только текстовый чат)
        [BsonElement("text")]
        public string Text { get; set; }
        //Timestamp - время отправки сообщения
        [BsonElement("timestamp")]
        public double Timestamp { get; set; }
        //keyMessage - ключ сообщения 
        //??
        [BsonElement("keyMessage")]
        public string KeyMessage { get; set; }
        //type
        //??
        [BsonElement("type")]
        public string Type { get; set; }
        //seen - статус прочтения
        [BsonElement("seen")]
        public bool Seen { get; set; }
    }
}
