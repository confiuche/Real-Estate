import mongoose, { Schema } from "mongoose";

const listPropertySchema = new mongoose.Schema(
    {
    propertyType:{
        type:String,
        required:[true, "Property type is required"]
    },
    location:{
        type:String,
        required:[true]
    },
    images:{
        type:String,
        required:[true]
    },
    description:{
        type:String,
        required:[true]
    },
    availableDate:{
        type:Date
    },
    amount:{
        type:String,
        required
    },
    fileDoc:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true, ""]
    }
},
{
    timeStamps:true,
    toJSON:{virtuals:true}
}
)

const List = mongoose.model("List", listPropertySchema);
export default List