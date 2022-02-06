var crypto = require('crypto');

function usuariosDao(connection){
    this._connection =connection();   
}



usuariosDao.prototype.inserirUsuario =  function  (usuario,res){
        this._connection.connect();
        const database = this._connection.db("Got");
        const usuarios = database.collection("usuarios");

        var senha_crypto =crypto.createHash('md5').update(usuario.senha).digest('hex');
        usuario.senha = senha_crypto;
        // create a document to insert
        const result =  usuarios.insertOne(usuario);

        usuario.msg = 2;
        res.render("index",{validacao :{} ,dadosForm:usuario});

    //this._connection.close(); Necessário corrigir fechamento da conexao do banco erro:UnhandledPromiseRejectionWarning: MongoTopologyClosedError: Topology is closed
}

/*usuariosDao.prototype.encerraConexao = function(){
    this._connection.close();
}*/

usuariosDao.prototype.autenticar = function(usuario,req,res){
    this._connection.connect();
    const database = this._connection.db("Got");
    const usuarios = database.collection("usuarios");

    //cryptografar a senha
    var senha_crypto =crypto.createHash('md5').update(usuario.senha).digest('hex');
    usuario.senha = senha_crypto;

    const result =  usuarios.find({usuario:usuario.usuario,senha:usuario.senha}).toArray(function(err,resultado){
        if (resultado[0] !=  undefined){
            req.session.autirizado = true;

            req.session.usuario = resultado[0].usuario;
            req.session.casa = resultado[0].casa;
           
        }
        if(req.session.autirizado){
            res.redirect('jogo');
          
        }else{
            usuario.msg = 1;
            res.render("index",{validacao :{} ,dadosForm:usuario});
           
        }
    })

}


module.exports = function(){
    return usuariosDao;
}