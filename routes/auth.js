import express from "express";
import User from "../models/User.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();
const refreshTokenStored = process.env.JWT_REFRESH_SECRET;

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

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentails" });
    }
    const isMatch = await user.isValidPassword(password);
    if (!isMatch) return res.status(403).json({ msg: "Invalid Credentails" });
    
    const accessToken = generateArccessToken(user);
    const refreshToken = generateRefreshToken(user);
    console.log(password)

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Server Error: Something went wrong during the authentication process" });
  }
});

router.post("/refresh", async (req, res) => {
  const { refresh } = req.body;

  if (!refresh) {
    res.status(403).json({ err: "Refresh Token is required" });
  }
  jwt.verify(refresh, refreshTokenStored, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid refresh token" });

    const accessToken = generateAccessToken({ userId: user._id });
    res.status(200).json({ accessToken });
  });
});

export default router;
