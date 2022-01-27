function usuariosDao(connection){
    this._connection =connection();   
}



usuariosDao.prototype.inserirUsuario =  function  (usuario){
    
        const database = this._connection.db("Got");
        // 
        const usuarios = database.collection("usuarios");
        // create a document to insert
        const result = await usuarios.insertOne(usuario);

    //this._connection.close(); Necessário corrigir fechamento da conexao do banco erro:UnhandledPromiseRejectionWarning: MongoTopologyClosedError: Topology is closed
}

usuariosDao.prototype.encerraConexao = function(){
    this._connection.close();
}



module.exports = function(){
    return usuariosDao;
}