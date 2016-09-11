using System;
using System.Collections.Generic;
using MongoDB.Bson.Serialization.Attributes;

namespace Shiners.Models.Domain
{
    //таблица пользователей проекта
    class User
    {
        //userID - поле _id в таблице users(ключевое поле)
        [BsonElement("_id")]
        public string Id { get; set; }

        //username - поле username в таблице users(логин)
        [BsonElement("username")]
        public string UserName { get; set; }
        //createdAt - поле createdAt в таблице users(дата создания аккаунта)
        [BsonElement("createdAt")]
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

        public User()
        {
            Emails = new Email[5];
            Services = new Services();
            Profile = new Profile();
            Status = new Status();
        }
    }

    //класс для сервисной информации
    class Services
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
    class Password
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

    class Resume
    {
        public Resume()
        {
        }

        public Resume(LoginTokens loginTokens)
        {
            LoginTokens = loginTokens;
        }
        [BsonElement("loginTokens")]
        public LoginTokens LoginTokens { get; set; }
    }

    class LoginTokens
    {
        public LoginTokens()
        {
            When = DateTime.Now;
            HashedTokens = "";
        }

        public LoginTokens(DateTime when, string hashedTokens)
        {
            this.When = when;
            this.HashedTokens = hashedTokens;
        }
        [BsonElement("when")]
        public DateTime When { get; set; }
        [BsonElement("hashedTokens")]
        public string HashedTokens { get; set; }
    }
    //класс для почтовых ящиков
    class Email
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
        [BsonElement("adress")]
        public string Adress { get; set; }
        [BsonElement("verified")]
        public bool Verified { get; set; }
    }

    class Profile
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
    }

    class Status
    {
        public Status()
        {
            Lastlogin = new Lastlogin();
        }

        public Status(bool online, Lastlogin lastlogin, bool idle)
        {
            this.Online = online;
            this.Lastlogin = lastlogin;
            this.Idle = idle;
        }
        [BsonElement("online")]
        public bool Online { get; set; }
        [BsonElement("idle")]
        public bool Idle { get; set; }
        [BsonElement("lastlogin")]
        public Lastlogin Lastlogin { get; set; }
    }

    class Lastlogin
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
}
