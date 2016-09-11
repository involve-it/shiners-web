using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson.Serialization.Attributes;

namespace Shiners.Models.Domain
{
    //таблица с сылками на изображения(сами изображения хранятся на Amazon)
    class Image
    {
        //Id - поле _id в таблице images(ключевое поле)
        [BsonElement("_id")]
        public string Id { get; set; }
        //UserId - поле userId в таблице images, id пользователя загрузившего изображение
        [BsonElement("userId")]
        public string UserId { get; set; }
        //name - имя файла
        [BsonElement("name")]
        public string Name { get; set; }
        //data - ссылка на полноразмерное изображение
        [BsonElement("data")]
        public string Data { get; set; }
        //thumbnail - ссылка на уменьшенный вариант изображения
        [BsonElement("thumbnail")]
        public string Thumbnail { get; set; }
    }
}