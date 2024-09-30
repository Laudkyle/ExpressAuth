import express from 'express'
const port  = process.env.PORT

const app = express()


let posts = [
    {username:"kyle", title:'Title one'},
    {username:"Jim", title:'Title Two'},
]

app.get('/posts',(req,res)=>{
    res.json(posts)
})
app.listen(port,()=>{
    console.log(`Server started on port ${port}`)
})