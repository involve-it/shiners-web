﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson.Serialization.Attributes;

namespace Shiners.Models.Domain
{
    //тип поста
    //!!!!!!!НЕОБХОДИМА ПРОВЕРКА НА ИСПОЛЬЗОВАНИЕ!!!!!!
    class PostType : MeteorModel
    {
        //Id - поле _id в таблице PostType(ключевое поле)

        //name - тип поста
        [BsonElement("name")]
        public string Name { get; set; }
    }
}
