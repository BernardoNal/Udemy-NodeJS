const { emit } = require("../../config/server");

module.exports.iniciarChat = function(application,req,res){

    var dadosForm = req.body;

    req.assert('apelido','Nome ou apelido é obrigatório').notEmpty();
    req.assert('apelido','Nome ou apelido tem que conter de 3 a 20 caracteres').len(3,20);

    var erros = req.validationErrors();

    if(erros){
        res.render('index',{validacao : erros})
    }

    application.get("io").emit('msgParaCliente',{apelido: dadosForm.apelido,mensagem : "acabou de se conectar no servidor"})

    res.render('chat',{dadosForm :dadosForm});    
}