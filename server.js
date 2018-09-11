const app = require('./app');

//Variables
const port = 8000;

app.listen(port,"localhost",(err)=>{
    if(err){
        //logging
        console.error(err);
    }
	console.log('Example app listening on port: '+port);
});