using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Shiners.Models.Domain
{
    //таблица пользователей проекта
    [BsonIgnoreExtraElements]
    public class User : MeteorModel
    {
        //Id - поле _id в таблице users(ключевое поле)


        //username - поле username в таблице users(логин)
        [BsonElement("username")]
        public string Username { get; set; }
        //createdAt - поле createdAt в таблице users(дата создания аккаунта)
        [BsonElement("createdAt")]
        //[BsonDateTimeOptions(DateOnly = false, Kind = DateTimeKind.Unspecified, Representation = BsonType.DateTime)]
        public DateTime CreatedAt { get; set; }
        //servicess - поле services в таблице users(хранение сервисной информации доступ только на сервере)
        [BsonElement("services")]
        public Services Services { get; set; }
        //emails - адресс почты и верификация
        [BsonElement("emails")]
        public IList<Email> Emails { get; set; }
        //profile - техданные профиля(остался только язык)
        [BsonElement("profile")]
        public Profile Profile { get; set; }
        //status - данные по состоянию пользователя
        [BsonElement("status")]
        public Status Status { get; set; }

        [BsonElement("lastSessionId")]
        public string LastSessionId { get; set; }

        [BsonElement("online")]
        public bool Online { get; set; }

        [BsonElement("sessionIds")]
        public IList<string> SessionIds { get; set; }

        [BsonElement("coords")]
        public Coords Coords { get; set; }

        [BsonElement("lastMobileLocationReport")]
        [BsonIgnoreIfNull]
        [BsonIgnoreIfDefault]
        public object LastMobileLocationReport { get; set; }

        [BsonElement("enableNearbyNotifications")]
        public bool EnableNearbyNotifications { get; set; }
        
        [BsonElement("lastNearbyNotification")]
        
        public double LastNearbyNotification { get; set; }

        [BsonElement("notifiedPostIds")]
        public IList<string> NotifiedPostIds { get; set; }
        [BsonElement("tokens")]
        public IList<Token> Tokens { get; set; }

        [BsonElement("details1"), BsonIgnoreIfNull]      
        public IList<ProfileDetail> ProfileDetails { get; set; }

        [BsonElement("presences"), BsonIgnoreIfNull]      
        public BsonDocument Presences { get; set; }
        public User()
        {
            Emails = new Email[5];
            Services = new Services();
            Profile = new Profile();
            Status = new Status();
        }
    }

    //класс для сервисной информации
    public class Services
    {
        public Services() {}

        public Services(Password password, Resume resume)
        {
            Password = password;
            Resume = resume;
        }
        //pasword - пароль в bcrypt
        [BsonElement("password")]
        public Password Password { get; set; }
        //resume - ?
        [BsonElement("resume")]
        public Resume Resume {get; set; }
    }

    //класс для пароля
    public class Password
    {     
        public Password()
        {
            Bcrypt = "";
        }

        public Password(string bcrypt)
        {
            Bcrypt = bcrypt;
        }
        [BsonElement("bcrypt")]
        public string Bcrypt { get; set; }
    }

    public class Resume
    {
        public Resume()
        {
        }

        public Resume(IEnumerable<LoginToken> loginTokens)
        {
            LoginTokens = new List<LoginToken>(loginTokens);
        }
        [BsonElement("loginTokens")]
        public IList<LoginToken> LoginTokens { get; set; }
    }

    public class LoginToken
    {
        public LoginToken()
        {
            When = DateTime.Now;
            HashedToken = "";
        }

        public LoginToken(DateTime when, string hashedTokens)
        {
            this.When = when;
            this.HashedToken = hashedTokens;
        }
        [BsonElement("when")]
        public DateTime When { get; set; }
        [BsonElement("hashedToken")]
        public string HashedToken { get; set; }
    }
    //класс для почтовых ящиков
    public class Email
    {
        public Email()
        {
            Adress = "";
            Verified = false;
        }
        public Email(string adress, bool verified)
        {
            this.Adress = adress;
            this.Verified = verified;
        }
        [BsonElement("address")]
        public string Adress { get; set; }
        [BsonElement("verified")]
        public bool Verified { get; set; }
    }

    public class Profile
    {
        public Profile()
        {
            Language = "ru";
        }

        public Profile(string language)
        {
            this.Language = language;
        }
        [BsonElement("language")]
        public string Language { get; set; }
        [BsonElement("image")]
        public UserImage Image { get; set; }
        [BsonElement("isAdmin")]
        public Boolean IsAdmin { get; set; }
        [BsonElement("checkOwnPosts")]
        public bool CheckOwnPosts { get; set; }
    }

    public class UserImage
    {
        [BsonElement("data")]
        public string Data { get; set; }
        [BsonElement("thumbnail")]
        public string Thumbnail { get; set; }
    }

    public class Lastlogin
    {
        public Lastlogin()
        {
            Date = DateTime.Now;
            IpAddr = "";
            UserAgent = "";
        }

        public Lastlogin(DateTime date, string ipAddr, string userAgent)
        {
            Date = date;
            IpAddr = ipAddr;
            UserAgent = userAgent;
        }
        [BsonElement("date")]
        public DateTime Date { get; set; }
        [BsonElement("ipAddr")]
        public string IpAddr { get; set; }
        [BsonElement("userAgent")]
        public string UserAgent { get; set; }
    }

    public class Token
    {
        [BsonElement("deviceId")]
        public string DeviceId { get; set; }
        [BsonElement("token")]
        public DeviceToken DeviceToken { get; set; }
    }

    public class DeviceToken
    {
        [BsonElement("apn")]
        public string Apn { get; set; }
    }
}
