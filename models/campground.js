var mongoose = require("mongoose");

var campgroundSchema = mongoose.Schema({
    name : String,
    image: String,
    desc: String,
    author:{
        id:{
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        },
        username : String
    },
    
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "Comment" 
        }
    ]
});

module.exports = mongoose.model("Campground", campgroundSchema); // arg1 -Model Name in Db, arg2 - schema name

