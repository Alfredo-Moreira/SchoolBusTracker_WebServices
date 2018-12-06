const app = require('./app');
const mongoose = app.get('mongoose');

//Variables
const port = app.get('port');
const url = app.get('hostURL');
const mongDBURL = mongoose.get('url');


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