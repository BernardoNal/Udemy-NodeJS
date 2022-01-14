
module.exports=function(App){

   

    App.get('/noticia',function(req,res){

        var connection = App.config.dbConnection();
        var noticiasModel = new App.app.models.noticiasModels(connection);

        noticiasModel.getNoticia(function(erro,result){
            res.render('noticias/noticia', {noticia : result});
            
        });


    })
}