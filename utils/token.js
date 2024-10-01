import jwt from 'jsonwebtoken';

const access = process.env.JWT_ACCESS_SECRET
const refresh = process.env.JWT_REFRESH_SECRET

export const generateAccessToken = (user)=>{
    return jwt.sign({userId:user._id},access,{expiresIn:'15m'})
}
export const generateRefreshToken = (user)=>{
    return jwt.sign({userId:user._id},refresh,{expiresIn:'7d'})
}