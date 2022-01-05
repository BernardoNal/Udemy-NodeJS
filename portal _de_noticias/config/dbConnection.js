var mysql = require('mysql');

var ConnectMySQL = function(){
    return connection = mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : '1234',
        database : 'portal_noticias',
        insecureAuth: true
    });
};

module.exports = function(){
    return ConnectMySQL;
}
