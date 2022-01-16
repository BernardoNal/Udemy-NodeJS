module.exports=function(App){
    App.get('/formulario_noticia',function(req,res){
       App.app.controllers.admin.formulario_noticia(App,req,res);
    })
    App.post('/noticias/salvar',function(req,res){
        App.app.controllers.admin.noticia_salvar(App,req,res);
    })

    
}