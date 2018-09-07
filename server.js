const app = require('./app');

//Variables
const port = 8000;

app.listen(port,"localhost",(err)=>{
    if(err){
        console.error(err);
    }
	console.log('Example app listening on port: '+port);
});