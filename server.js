const app = require('./app');

//Variables
const port = app.get('port');
const url = app.get('hostURL');


mongoose.connect(mongDBURL,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('Connected to ' + mongDBURL);
    }
    });

app.listen(port,url,(err)=>{
    if(err){
        console.error(err);
    }
console.log('Example app listening on address: '+url+':'+port);
});