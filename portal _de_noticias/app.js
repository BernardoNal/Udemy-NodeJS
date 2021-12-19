var express = require('express');
var app = express();

app.set('view engine','ejs');

app.get('/',function(req,res){
    res.render('home/index');
})

app.get('/formulario_noticia',function(req,res){
    res.render('admin/form_add_noticia');
})
app.get('/noticias',function(req,res){
    res.render('noticias/noticias');
})

app.get('/games',function(req,res){
    res.render('secao/games');
})

app.listen(4200,function(){
    console.log('Servido Online');
})