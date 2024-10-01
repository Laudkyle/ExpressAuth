import mongoose from "mongoose";


let dbConnection;
export const connectToDB = (cb)=>{
    mongoose.connect('mongodb://localhost:27017/').then((client)=>{
        dbConnection = client.db
        return cb()
    }).catch((error)=>{
        console.log({error:error})
        return cb(error)
    })
}
export const getDB = dbConnection;