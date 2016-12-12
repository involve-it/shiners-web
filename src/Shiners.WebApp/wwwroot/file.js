var Person = (function () {
    function Person(name) {
        var _this = this;
        this.myname = name;
        var names = ["dsdfs", 'sdsd', "adfsd"];
        names.forEach(function (n) {
            var nn = n.toLowerCase();
            nn = nn + _this.myname;
        });
    }
    Person.prototype.someFunc = function () {
        return "";
    };
    return Person;
}());
var user = new Person("");
var result = user.someFunc();
