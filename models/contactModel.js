const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    name : {
        type : String, 
        required : [true,"Please add the contact name"]
    },
    email : {
        type : String, 
        required : [true,"Please add the contact email"]
    },
    phone : {
        type : String, 
        required : [true,"Please add the contact phone number"]
    },
    user_id:{
        type : String,
        required : true
    }
},
{
    timestamps : true
})

module.exports = mongoose.model("Contact",contactSchema)