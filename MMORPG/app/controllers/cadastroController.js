module.exports.cadastro = function (application,req,res) { 

    res.render('cadastro',{validacao :{},dadosForm:{}});
 }

module.exports.cadastrar = function (application,req,res) { 

    var dadosForm = req.body;

    req.assert('nome','Nome não pode ser vazio').notEmpty();
    req.assert('usuario','Usuario não pode ser vazio').notEmpty();
    req.assert('senha','Senha não pode ser vazio').notEmpty();
    req.assert('casa','Precisa ser escolhido uma casa').notEmpty();

    var erros = req.validationErrors();
    if(erros){
        res.render('cadastro',{validacao : erros,dadosForm: dadosForm });
        return;
    }
    
    var connection = application.config.dbConnection;
    var usuariosDao = new application.app.models.usuariosDao(connection);
    var jogoDao = new application.app.models.jogoDao(connection);

    usuariosDao.inserirUsuario(dadosForm,res);
    jogoDao.gerarParametros(dadosForm.usuario);

    //usuariosDao.encerraConexao();
   
    
    
}