const mongoose = require('mongoose');

const draftSchema =new mongoose.Schema({

    publishDate:{
        type:Date,
        required:true,
        default:Date.now,

    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Reporter",

    },
    articleType:{
        type:String,
        enum:['General','Sport','Health','Political','Educational','Criminal','Accident'],
        required:true,

    },
    
    newsHeading:{
        type:String,
        required:true
    },
    newsDescription:{
        type:String,
        required:true
    },
    newsDescriptionLong:{
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
    coverImage:{
        type:String,
        required:true
    },
    publicationType:{
        type:Number,
        enum:[0,1,2],
        required:true,
        

    }

})


module.exports= mongoose.model('Draft',draftSchema);