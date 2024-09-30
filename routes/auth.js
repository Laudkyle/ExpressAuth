import express from "express";
import User from "../models/User";
import { generateAcessToken, generateRefreshToken } from "../utils/token";
import jwt from "jsonWebToken";
const router = express.Router();
router.use(express.json());

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(403).json({ msg: "Username already exists" });
    }
    user = new User({ username, password });
    await user.save();
    res.status(201).json({ msg: "User Created Succesfully" });
  } catch (error) {
    res.status(500).json({ err: "Something went Wrong" });
  }
});


router.post('/login',async (req,res)=>{
    const {username,password} = req.body

    try {
        let user = await User.findOne({username});
        if(!user){
            return res.status(403).json({msg:'Invalid Credentails'})
        }
        const isMatch = await user.isValidPassword(password);
        if (!isMatch){
            return res.status(403).json({msg:'Invalid Credentails'})

        }
        const accessToken = generateAcessToken(user)
        const refreshToken = generateRefreshToken(user)
        res.status(200).json({access: accessToken,refresh:refreshToken})
    } catch (error) {
        res.status(500).json({msg: "Something went wrong during the authentication process"})
    }
})