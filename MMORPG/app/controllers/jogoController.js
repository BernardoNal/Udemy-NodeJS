module.exports.jogo = function (application,req,res) { 
    if(req.session.autirizado !== true){
        res.send("O usuário precisa fazer login");
        return;
       
    }

    var msg = ""
    if(req.query.msg != ""){
       msg = req.query.msg ;
    }

    var usuario = req.session.usuario;
    var casa = req.session.casa;

    var connection = application.config.dbConnection;
    var jogoDao = new application.app.models.jogoDao(connection);

    jogoDao.iniciarJogo(res,usuario,casa,msg);
    
}

module.exports.sair = function (application,req,res) { 
    req.session.destroy(function(err){
        res.render("index",{validacao:{},dadosForm:{}})
    });
}

module.exports.suditos = function (application,req,res) { 
    if(req.session.autirizado !== true){
        res.send("O usuário precisa fazer login");
        return;
       
    }
        res.render("aldeoes",{validacao:{}})
}

module.exports.pergaminhos = function (application,req,res) { 
    if(req.session.autirizado !== true){
        res.send("O usuário precisa fazer login");
        return;
       
    }

    var connection = application.config.dbConnection;
    var jogoDao = new application.app.models.jogoDao(connection);

    var usuario = req.session.usuario;

    jogoDao.getAcoes(usuario,res);

}

module.exports.ordenarAcaoSuditos = function (application,req,res) { 
    if(req.session.autirizado !== true){
        res.send("O usuário precisa fazer login");
        return;
       
    }  
    
    var dadosForm = req.body;

    req.assert("acao","A ação deve ser informada").notEmpty();
    req.assert('quantidade','A quantidade deve ser informada').notEmpty();

    var erros = req.validationErrors();

    if(erros){
        res.redirect('jogo?msg=A');
        return;
    }
 
    var connection = application.config.dbConnection;
    var jogoDao = new application.app.models.jogoDao(connection);

    dadosForm.usuario = req.session.usuario;
    jogoDao.acao(dadosForm);

    res.redirect('jogo?msg=B');

}

module.exports.revogarAcao = function (application,req,res) { 
     var url_query = req.query;

    var connection = application.config.dbConnection;
    var jogoDao = new application.app.models.jogoDao(connection);

    //dadosForm.usuario = req.session.usuario;
    var id = url_query.id_acao;
    jogoDao.revogar_acao(id,res);
}