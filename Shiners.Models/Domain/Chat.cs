using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson.Serialization.Attributes;

namespace Shiners.Models.Domain
{
    //таблица для хранения сервисной информации о чатах(сообщения хранятся в отдельной таблице)
    public class Chat : MeteorModel
    {

        //UserId - поле userId в таблице chats, id пользователя инициатора чата
        [BsonElement("userId")]
        public string UserId { get; set; } 
        //users - массив участников чата
        [BsonElement("users")]
        public IList<string> Users { get; set; } 
        //TimeBegin - время создания чата
        [BsonElement("timeBegin")]
        public double TimeBegin { get; set; }
        //LastMessageTs - время последнего сообщения
        [BsonElement("lastMessageTs")]
        public double LastMessageTs { get; set; }
        //Activated - активность чата
        [BsonElement("activated")]
        public bool Activated { get; set; }

        public Chat()
        {
            //пока доступны чаты только для 2-х пользователей
            Users = new string[2];
        }
    }
}