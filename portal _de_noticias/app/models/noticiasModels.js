    function Noticias(connection){
        this._connection = connection;
    }
    Noticias.prototype.getNoticias =function (callback){
        this._connection.query('select * from noticias order by created_at desc',callback);    
    }

    Noticias.prototype.getNoticia =function (id,callback){
        this._connection.query('select * from noticias where  id = ?',id.id,callback);    
    }

    Noticias.prototype.salvarNoticia =function (noticia,callback){
        this._connection.query('insert into noticias set ?',noticia,callback);    
    }
    Noticias.prototype.get5ultimasNoticias = function (callback){
        this._connection.query('select * from noticias order by created_at desc limit 5',callback);    
    }

    
    
    
    module.exports = function(){
        return Noticias;
    }