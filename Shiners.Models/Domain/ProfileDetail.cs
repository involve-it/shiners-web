using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson.Serialization.Attributes;

namespace Shiners.Models.Domain
{
    //анкетные данные пользователя ФИО, город, контактная информация
    class ProfileDetail : MeteorModel
    {
        //Id - поле _id в таблице profileDetails(ключевое поле)

        //UserId - поле userId в таблице profileDetails, id пользователя обладателя данного свойства
        [BsonElement("userId")]
        public string UserId { get; set; }
        //key - имя свойства(поля в анкете: фамилия, имя, город и т.д.)
        [BsonElement("key")]
        public string Key { get; set; }
        //value - значение свойства анкеты
        [BsonElement("value")]
        public string Value { get; set; }
        //policy - политика конфиденциальности данного поля анкеты(пока: скрыто-0/публично-1)
        [BsonElement("policy")]
        public string Policy { get; set; }
    }
}