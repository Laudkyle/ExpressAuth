import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

// User Schema
const UserSchema = new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    password:{type:String, required:true}
})

// Pre saving the hook to hash the password before saving
UserSchema.pre('save',async function (next) {
    const salt= await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})