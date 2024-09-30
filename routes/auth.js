import express from "express";
import User from "../models/User";

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
  } catch (error) {res.status(500).json({err: "Something went Wrong"})}
});
