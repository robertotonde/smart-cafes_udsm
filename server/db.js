const mongooose = require('mongoose');

var mongoURL = "mongodb+srv://robertotonde:robertotonde1234@cluster0.ldktc.mongodb.net/smart-cafe"



mongooose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });


var db = mongooose.connection;


db.on('connected', () => {
    console.log('connected to database');
})

db.on('error', () => {
    console.log('error connecting to database');


})

module.exports = mongooose