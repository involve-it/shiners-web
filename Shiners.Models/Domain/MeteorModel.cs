﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json.Linq;

namespace Shiners.Models.Domain
{
    public class MeteorModel
    {
        /// <summary>
        /// Id - поле _id в таблице images(ключевое поле)
        /// </summary>
        [BsonElement("_id")]
        public string Id { get; set; }
        /// <summary>
        /// серриализует модель в  json объект
        /// </summary>
        public JObject ToJObject()
        {
            var str = this.ToJson();
            return JObject.Parse(str);
        }
    }
}