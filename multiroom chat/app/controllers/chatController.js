module.exports.iniciarChat = function(application,req,res){

    var dadosForm = req.body;

    req.assert('apelido','Nome ou apelido é obrigatório').notEmpty();
    req.assert('apelido','Nome ou apelido tem que conter de 3 a 20 caracteres').len(3,20);

    var erros = req.validationErrors();

    if(erros){
        res.render('index',{validacao : erros})
    }

    res.render('chat');    
}