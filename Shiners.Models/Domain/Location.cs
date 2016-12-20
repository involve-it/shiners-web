using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson.Serialization.Attributes;

namespace Shiners.Models.Domain
{
    public class Location:MeteorModel
    {
        //UserId - поле userId в таблице locations, id пользователя который добавлял локацию 
        [BsonElement("userId")]
        public string UserId { get; set; }
        //name - имя локации, адресс
        [BsonElement("name")]
        public string Name { get; set; }
        //accurateAddress - сокращенное имя локации
        [BsonElement("accurateAddress")]
        public string AccurateAddress { get; set; }
        //placeType - тип локации
        [BsonElement("placeType")]
        public string PlaceType { get; set; }
        //public - публичность адреса
        [BsonElement("public")]
        public bool Public { get; set; }
        //coords - координаты локации
        [BsonElement("coords")]
        public Coords Сoords { get; set; }

        public Location()
        {
            Сoords = new Coords();
        }
    }
    public class Coords
    {
        [BsonElement("lat")]
        public double Lat { get; set; }
        [BsonElement("lng")]
        public double Lng { get; set; }
    }
}