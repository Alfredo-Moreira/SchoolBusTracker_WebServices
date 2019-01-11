const moment = require('moment');

const momentFunct = {
    getDate:function(){
        var date = moment(Date.now()).format();
        return date;
    },
    getDateLocalized:function(){
        var date = moment(Date.now()).format('MM dd YYYY');
        console.log(date)
        return date;
    }
}


module.exports = momentFunct;