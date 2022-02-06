//criar objeto para usar da busca do id
var OBJECTID =  require('mongodb').ObjectId;

function jogoDao(connection){
    this._connection =connection();   
}

jogoDao.prototype.gerarParametros =  function  (usuario){
    this._connection.connect();
    const database = this._connection.db("Got");
    const jogo = database.collection("jogo");
    // create a document to insert
    const result =  jogo.insertOne({
        usuario:usuario,
        moeda: 15,
        suditos: 10,
        temor: Math.floor(Math.random()*1000),
        sabedoria: Math.floor(Math.random()*1000),
        comercio: Math.floor(Math.random()*1000),
        magia: Math.floor(Math.random()*1000)
    });
//this._connection.close();
// Necessário corrigir fechamento da conexao do banco erro:UnhandledPromiseRejectionWarning: MongoTopologyClosedError: Topology is closed
}

jogoDao.prototype.iniciarJogo = function(res,usuario,casa,msg){
    this._connection.connect();
    const database = this._connection.db("Got");
    const jogo = database.collection("jogo");

    const result =  jogo.find({usuario:usuario}).toArray(function(err,resultado){
        
        res.render('jogo',{img_casa: casa,jogo:resultado[0],msg:msg});
    });
    //necessário corrigir problema de encerra a conexão com banco
}

jogoDao.prototype.acao = function(acao){
    this._connection.connect();
    const database = this._connection.db("Got");
    const acaoJogador = database.collection("acao");

    var date = new Date();

    var tempo = null;

    switch(parseInt(acao.acao)){
        case 1: tempo = 60 * 60000;break;
        case 2: tempo = 120 * 60000;break;
        case 3: tempo = 300 * 60000;break;
        case 4: tempo = 300 * 60000;break;
    }

    acao.acao_encerra=date.getTime()+tempo;

    // create a document to insert
    const result =  acaoJogador.insertOne(acao);

    const jogo = database.collection("jogo");

    var moedas = null;

    switch(parseInt(acao.acao)){
        case 1: moedas = -2 * acao.quantidade;break;
        case 2: moedas = -3 * acao.quantidade;break;
        case 3: moedas = -1 * acao.quantidade;break;
        case 4: moedas = -1 * acao.quantidade;break;
    };

    jogo.update(
        {usuario :acao.usuario},
        {$inc : {moeda:moedas}}
        
    );
    //necessário corrigir problema de encerra a conexão com banco
}

jogoDao.prototype.getAcoes = function(usuario,res){
    this._connection.connect();
    const database = this._connection.db("Got");
    const acaoJogador = database.collection("acao");


    var date = new Date();
    var momento_atual = date.getTime();
    const resultado =  acaoJogador.find({usuario:usuario, acao_encerra:{$gt:momento_atual}}).toArray(function(err, result){
           
        res.render('pergaminhos', { acoes: result });

    })
    //necessário corrigir problema de encerra a conexão com banco
}

jogoDao.prototype.revogar_acao = function(id,res){
    this._connection.connect();
    const database = this._connection.db("Got");
    const acaoJogador = database.collection("acao");

    const resultado =  acaoJogador.remove(
        {_id : OBJECTID(id)});
    console.log(resultado);
    if(resultado != ""){
        res.redirect('jogo?msg=D');
    }
    //necessário corrigir problema de encerra a conexão com banco
}

module.exports = function(){
    return jogoDao;
}