function usuariosDao(connection){
    this._connection =connection();   
}



usuariosDao.prototype.inserirUsuario =  function  (usuario){
        this._connection.connect();
        const database = this._connection.db("Got");
        const usuarios = database.collection("usuarios");
        // create a document to insert
        const result =  usuarios.insertOne(usuario);

    //this._connection.close(); Necessário corrigir fechamento da conexao do banco erro:UnhandledPromiseRejectionWarning: MongoTopologyClosedError: Topology is closed
}

/*usuariosDao.prototype.encerraConexao = function(){
    this._connection.close();
}*/

usuariosDao.prototype.autenticar = function(usuario,req,res){
    this._connection.connect();
    const database = this._connection.db("Got");
    const usuarios = database.collection("usuarios");

    const result =  usuarios.find({usuario:usuario.usuario,senha:usuario.senha}).toArray(function(err,resultado){
        if (resultado[0] !=  undefined){
            req.session.autirizado = true;

            req.session.usuario = resultado[0].usuario;
            req.session.casa = resultado[0].casa;
           
        }
        if(req.session.autirizado){
            res.redirect('jogo');
            console.log(resultado);
        }else{
            res.render("index",{validacao :{} });
            console.log(resultado);
        }
    })

    //console.log(resultado);
}


module.exports = function(){
    return usuariosDao;
}