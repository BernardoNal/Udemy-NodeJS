module.exports=function(App){

   

    App.get('/noticias',function(req,res){

        var connection = App.config.dbConnection();
        var noticiasModel = new App.app.models.noticiasModels(connection);

        noticiasModel.getNoticias(function(erro,result){
            res.render('noticias/noticias', {noticias : result});
            
        });


    })
}