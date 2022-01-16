module.exports.index= function(application,req,res){

    var connection = application.config.dbConnection();
    var noticiasModel = new application.app.models.noticiasModels(connection);

    noticiasModel.get5ultimasNoticias(function(erro,result){
        res.render('home/index',{noticias :result});
    });
    
}