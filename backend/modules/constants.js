const time = require('./time');
const path = require('path');

class constants{
    static START = new time(15, 30);
    static END = new time(18, 0);
    static CLUB = "Robotics";
    static FILESTORAGE = __dirname;
    static PORT = 8080;
}

module.exports = constants;