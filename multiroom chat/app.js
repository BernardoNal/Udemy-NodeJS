var app = require('./config/server')

var server = app.listen(3200,function(){
    console.log('Servido Online');
})

var io = require('socket.io')(server);

app.set("io",io);

io.on('connection',function(socket){
    console.log("usuario conectou");

    socket.on('disconnect',function(socket){
        console.log("usuario desconectou");
    });

    socket.on('msgParaServidor',function(data){
        /* mensagens */
        socket.emit('msgParaCliente',
            {apelido:data.apelido , mensagem:data.mensagem});
        
        socket.broadcast.emit(
            'msgParaCliente',
            { apelido: data.apelido, mensagem: data.mensagem }
        );   
        
        /* participantes */
        if(parseInt(data.apelido_atualizado_cliente) == 0){
        socket.emit('participantesParaCliente',
            {apelido:data.apelido });
        
        socket.broadcast.emit('participantesParaCliente',
            { apelido: data.apelido }
        );  
        } 
    }); 
    
})