module.exports=function(App){

   

    App.get('/noticias',function(req,res){

        var connection = App.config.dbConnection();
        var noticiasModel = App.app.models.noticiasModels;

        noticiasModel.getNoticias(connection,function(erro,result){
            res.render('noticias/noticias', {noticias : result});
            
        });


    })
}