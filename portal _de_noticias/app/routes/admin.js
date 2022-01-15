module.exports=function(App){
    App.get('/formulario_noticia',function(req,res){
        res.render('admin/form_add_noticia',{validacao :{},noticia:{}});
    })
    App.post('/noticias/salvar',function(req,res){
        var noticia = req.body;

        req.assert('titulo','Título é obrigatório').notEmpty();
        req.assert('resumo','Resumo é obrigatório').notEmpty();
        req.assert('resumo','Resumo deve conter entre 1 e 100').len(1,100);
        req.assert('autor','Autor é obrigatório').notEmpty();
        req.assert('data_noticia','A data é obrigatória').notEmpty();
        req.assert('noticia','A notícia é obrigatória').notEmpty();

        var erros = req.validationErrors();

        if(erros){
            res.render('admin/form_add_noticia',{validacao : erros , noticia : noticia});
            return;
        }
       
        var connection = App.config.dbConnection();
        var noticiasModel = new App.app.models.noticiasModels(connection);

        noticiasModel.salvarNoticia(noticia,function(erro,result){
            res.redirect('/noticias');
            
        });

    })
}