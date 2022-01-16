//console.log('Criando site de notícias')
var hhtp = require('http');

var server = hhtp.createServer(function(req, res){

    var categoria = req.url;
    if(categoria == '/games'){
        res.end("<html><body> Area Gamer</body></html>");
    }else if (categoria =='/Hardware') {
        res.end("<html><body> Tudo sobre Hardware</body></html>");
    }else  {
        res.end("<html><body> Portal de Notícias</body></html>");
    }
});

server.listen(4200);