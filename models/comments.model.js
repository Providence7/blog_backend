import mongoose from "mongoose";
import { Schema } from "mongoose";
const commentSchema  = new Schema({
    post : {
        type : Schema.Types.ObjectId,
        ref :  'Post',
     require : true
    },
    user : {
        type : Schema.Types.ObjectId,
        ref :  'User',
     require : true
    },
    desc : {
        type : String,
        require : true
    }


},{timestamps : true})

export default mongoose.model("Commment", commentSchema)
