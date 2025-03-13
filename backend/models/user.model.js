import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    fullname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minLength:6,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    followers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
    ],
    followings:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
    ],
    bio:{
        type:String,
        default:''
    },
    profileImg:{
        type:String,
        default:'https://img.myloview.com/posters/default-avatar-profile-icon-vector-social-media-user-photo-700-205577532.jpg'
    },
    coverImg:{
        type:String,
        default:''
    },
    link:{
        type:String,
        default:''
    }
});

export const User = mongoose.model('User',userSchema);