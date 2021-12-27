var connectionDB = require('../../config/dbConnection');

module.exports=function(app){
    var connection = connectionDB();
    app.get('/noticias',function(req,res){

        connection.query('select * from noticias',function(erro,result){
            res.render('noticias/noticias', {noticias : result});
            
        });

    })
}