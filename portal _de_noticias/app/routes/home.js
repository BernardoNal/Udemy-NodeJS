module.exports=function(App){
    App.get('/',function(req,res){
        App.app.controllers.home.index(App,req,res);
    })
    
}