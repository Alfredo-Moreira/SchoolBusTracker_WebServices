const app = require('./app');

//Variables
const port = app.get('port');
const url = app.get('hostURL');

app.listen(port,url,(err)=>{
    if(err){
        console.error(err);
    }
console.log('Example app listening on address: '+url+':'+port);
});