const mongoose = require('mongoose');

const reporterSchema =new mongoose.Schema({

    firstName:{
        type:String,
        required:true

    },
    lastName:{
        type:String,
        required:true

    },
    password:{
        type:String,
        required:true

    },
    
    email:{
        type:String,
        required:true

    },
    city:{
        type:String,
        required:true

    },
    country:{
        type:String,
        required:true

    },
    contactNumber:{
        type:String,
        required:true

    }

})


module.exports= mongoose.model('Reporter',reporterSchema);