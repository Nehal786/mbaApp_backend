const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },

    userId:{
        type:String,
        required:true,
        unique:true
    },

    userType:{
        type:String,
        default:"CUSTOMER"
    },

    userStatus:{
        type:String,
        default:"APPROVED"
    },
    createdAt:{
        type:Date,
        immutable:true,
        default: ()=>{
            return Date.now();
        }
    },

    updatedAt:{
        type:Date,
        default: () => {
            return Date.now();
        }
    }
})

module.exports = mongoose.model("User",userSchema);