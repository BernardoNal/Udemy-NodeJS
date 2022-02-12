var express = require('express'),
    bodyParser = require('body-parser'),
    mongoDB = require('mongodb');
var app = express();


/* configurar o middleware express.static */
app.use(express.static('./app/public'));

/* configurar o middleware body-parser */
app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json());       

var port = 8080;

app.listen(port);

console.log('Servidor subiu');

app.get('/',function(req,res){

    res.send({msg:'olá'});
});