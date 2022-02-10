var http = require('http');

var opcoes ={
    hostname:'localhost',
    port:80,
    path:'/',
    method: 'post',
    headers:{
        'Accept' : 'application/json',
        //'Content-type' : 'application/x-www-form-urlencoded'
        'Content-type' : 'application/json'
    }

}


//var html = "nome-Nal";
var json ={nome :'Nal'};
var string_json = JSON.stringify(json);

buffer_corpo_response = [];

var req = http.request(opcoes,function(res){

    res.on('data',function(pedaco){
        buffer_corpo_response.push(pedaco);
    });

    res.on('end',function(){
        var buffer_string =Buffer.concat(buffer_corpo_response).toString();
        console.log(buffer_string);
    });
});

req.write(string_json);
req.end();