const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema(
    {
        userLineId:{
            type:String,
            required:true
        },
        describe:{
            type:String,
            required:true
        },
        creatDate:{
            type:Date,
            default: Date.now
        }
    }
)
module.exports=User=mongoose.model("describe",UserSchema);
