const mongoose = require('mongoose');

const articlesSchema =new mongoose.Schema({

    publishDate:{
        type:Date,
        required:true,
        default:Date.now,

    },
    author:{
        type:mongoose.Schema.ObjectId,
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

})


module.exports= mongoose.model('Articles',articlesSchema);