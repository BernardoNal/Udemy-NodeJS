module.exports=function(App){
    App.get('/formulario_noticia',function(req,res){
        res.render('admin/form_add_noticia');
    })
    App.post('/noticias/salvar',function(req,res){
        var noticia = req.body;
       
        var connection = App.config.dbConnection();
        var noticiasModel = App.app.models.noticiasModels;

        noticiasModel.salvarNoticia(noticia,connection,function(erro,result){
            res.redirect('/noticias');
            
        });

    })
}