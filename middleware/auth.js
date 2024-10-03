import jwt from 'jsonwebtoken'


const accessToken = process.env.JWT_ACCESS_SECRET

const auth = (req,res,next)=>{
    token = req.header('Authorization').replace('Bearer','')
    if (!token){
        res.status(403).json({msg:"You need an access token to interact with this API"})
    }
try {
    
    const decoded = jwt.verify(token,accessToken)
    req.user = decoded
    res.sendStatus(200)
    next()
} catch (error) {
    res.status(403).json({error:'Invalid access token'})
}
}