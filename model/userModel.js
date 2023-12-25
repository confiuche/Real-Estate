import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Firstname is Required"]
    },
    lastname: {
        type: String,
        required: [true, "Lastname is Required"]
    },
    email: {
        type: String,
        required: [true, "Email is Required"]
    },
    password: {
        type: String,
        required: [true, "Password is Required"]
    },
    profilephoto: {
        type: String,
    },
    gender: {
        type: String,
    },
    age: {
        type: Number,
    },
    phone: {
        type: Number,
    },
    blocked:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    lists: [
        {
            type: mongoose.Schema.Type.ObjectId,
            ref: List
        },
    ],
    isBlocked: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ["Admin", "User", "Agent"],
        default: "User"
    },
    resetToken: {
        type: String
    },
    resetTokenExpiration: {
        type: Date
    },
},
    {
        timestamps: true,
        toJSON: { virtuals: true }

    }
);

const User = mongoose.model("User", userSchema);
export default User