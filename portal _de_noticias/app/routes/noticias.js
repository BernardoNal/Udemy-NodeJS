module.exports=function(App){

    App.get('/noticias',function(req,res){
        App.app.controllers.noticia.noticias(App,req,res);
    })
    
    App.get('/noticia',function(req,res){
        App.app.controllers.noticia.noticia(App,req,res);
    })    
}