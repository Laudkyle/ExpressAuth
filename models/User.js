import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

// User Schema
const UserSchema = new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    password:{type:String, required:true}
})

// Pre saving the hook to hash the password before saving
