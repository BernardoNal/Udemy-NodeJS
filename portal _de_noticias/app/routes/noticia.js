
module.exports=function(App){

   

    App.get('/noticia',function(req,res){

        var connection = App.config.dbConnection();
        var noticiasModel = App.app.models.noticiasModels;

        noticiasModel.getNoticia(connection,function(erro,result){
            res.render('noticias/noticia', {noticia : result});
            
        });


    })
}