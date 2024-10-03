import express from 'express'
import authMiddleware from '../middleware/auth.js'
import { Student } from '../models/User.js'

const routerStudents = express.Router()



routerStudents.get('/',authMiddleware,(req,res)=>{
    Student.find().then((students)=>{
        res.status(200).json(students)
    }).catch((error)=>{
res.status(400).json({msg: "Something went wrong!!!"})
    })
})

export default routerStudents;