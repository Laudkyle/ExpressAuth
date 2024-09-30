import jwt from JsonWebTokenError

const access = process.env.JWT_ACCESS_SECRET
const refresh = process.env.JWT_REFRESH_SECRET

const generateAccessToken = (user)=>{
    return jwt.sign({userId:user._id},access,{expiresIn:'15m'})
}
const generateRefreshToken = (user)=>{
    return jwt.sign({userId:user._id},refresh,{expiresIn:'7d'})
}