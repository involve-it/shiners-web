using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson.Serialization.Attributes;

namespace Shiners.Models.Domain
{
    //хранение всех данных о постах
    public class Post : MeteorModel
    {
        //userId - Id хозяина(автора) поста
        [BsonElement("userId")]
        public string UserId { get; set; }
        //type - тип поста
        [BsonElement("type")]
        public string Type { get; set; }

        //tags - тэги(механизм экспериментальный возможно следует отключить!!!!)
        [BsonElement("tags")]
        public IList<string> Tags { get; set; }
        //timestamp - дата создания поста
        [BsonElement("timestamp")]
        public double Timestamp { get; set; }
        //endDatePost - дата окончания поста
        [BsonElement("endDatePost")]
        public string EndDatePost { get; set; }
        //timePause - вспомогательные данные(сколько оставалось времени до конца, когда пост был поставлен на паузу)
        [BsonElement("timePause")]
        public string TimePause { get; set; }

        [BsonElement("jobsDetails")]
        public JobsDetails JobsDetails { get; set; }

        [BsonElement("details")]
        public Details Details { get; set; }

        [BsonElement("trainingsDetails")]
        public TrainingsDetails TrainingsDetails { get; set; }

        [BsonElement("stats")]
        public Stats Stats { get; set; }

        [BsonElement("status")]
        public PostStatus Status { get; set; }

        [BsonElement("presences")]
        public Presences Presences { get; set; }

        public Post()
        {
            Tags = new string[15];
            JobsDetails = new JobsDetails();
            Details = new Details();
            TrainingsDetails = new TrainingsDetails();
            Stats = new Stats();
            Status = new PostStatus();
            Presences = new Presences();

        }
    }
    public class Details
    {
        [BsonElement("anonymousPost")]
        public bool AnonymousPost { get; set; }

        [BsonElement("locations")]
        public IList<Locations> Locations { get; set; }

        [BsonElement("url")]
        public string Url { get; set; }

        [BsonElement("title")]
        public string Title { get; set; }

        [BsonElement("description")]
        public string Description { get; set; }

        [BsonElement("photos")]
        public IList<string> Photos { get; set; }



        public Details()
        {
            Locations = new Locations[2];
            Photos = new string[10];
           
        }

    }
    public class Locations
    {
        //по сути дублирование класса Location и дублирование записей в таблице!!!!!!!!!!!!!!
        [BsonElement("_id")]
        public string Id { get; set; }
        [BsonElement("name")]
        public string Name { get; set; }
        [BsonElement("placeType")]
        public string PlaceType { get; set; }
        [BsonElement("coords")]
        public Coords Сoords { get; set; }
        public Locations()
        {
            Сoords = new Coords();
        }
    }
    public class JobsDetails
    {
        
    }
    public class TrainingsDetails
    {
        [BsonElement("sectionLearning")]
        public string SectionLearning { get; set; }
        [BsonElement("typeCategory")]
        public string TypeCategory { get; set; }
    }
    public class PostStatus
    {
        [BsonElement("visible")]
        public string Visible { get; set; }
    }
    public class Presences
    {

    }
    public class Stats
    {
        [BsonElement("seenToday")]
        public Int32 SeenToday { get; set; }
        [BsonElement("seenTotal")]
        public Int32 SeenTotal { get; set; }
        [BsonElement("seenAll")]
        public Int32 SeenAll { get; set; }
    }
}
