import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})


const contentSchema = new mongoose.Schema({
    type:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    },
    tag:{
        type:String,
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    }
})

const linkSchema = new mongoose.Schema({
    hash:{
        type:String,
        unique:true
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    }
})

const tagSchema = new mongoose.Schema({
    tags:{
        type:[String]
    }
})

const userModel = mongoose.model("User",userSchema)
const contentModel = mongoose.model("Content",contentSchema)
const linkModel = mongoose.model("Link",linkSchema)
const tagModel = mongoose.model("Tag",tagSchema)


export {userModel,tagModel,contentModel,linkModel}