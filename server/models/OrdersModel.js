const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    
    name: {type : String, required : true},
    type : {type : String, required : true},
    address: {type : String, required : true},
    status: {type : Boolean, required : true , default : false},

},
{
    timestamps : true
});


module.exports = mongoose.model("orders", userSchema);