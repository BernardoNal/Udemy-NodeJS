var app = require('./config/server')

//var msg = require('./mod_teste')();--Exemple
/*--version section3
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
})*/

var rotaHome = require('./app/routes/home')(app);

var rotaNoticia = require('./app/routes/notica')(app);

var rotaFormularioNoticia = require('./app/routes/form_noticia')(app);

app.listen(4200,function(){
    console.log('Servido Online');
})