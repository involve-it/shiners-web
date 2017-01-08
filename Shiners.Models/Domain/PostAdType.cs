using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson.Serialization.Attributes;

namespace Shiners.Models.Domain
{
    //тип объявления
    class PostAdType : MeteorModel
    {
        //Id - поле _id в таблице PostAdTypes(ключевое поле)

        //name - имя типа
        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("intName")]
        public string IntName { get; set; }

        [BsonElement("id")]
        public string ID_ { get; set; }

        [BsonElement("fullName")]
        public string FullName { get; set; }

        [BsonElement("color")]
        public string Color { get; set; }

        [BsonElement("order")]
        public int Order { get; set; }
        //i18n - используется для перевода
        [BsonElement("i18n")]
        public I18n I18n { get; set; }
        
        public PostAdType()
        {
            I18n = new I18n();
        }
    }
    class I18n
    {
        public I18n() { }
        public I18n(Ru ru)
        {
            Ru = ru;
        }

        [BsonElement("ru")]
        public Ru Ru { get; set; }
    }
    class Ru
    {
        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("fullName")]
        public string FullName { get; set; }
    }
}