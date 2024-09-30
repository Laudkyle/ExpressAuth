import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Creating the user Schema

const UserSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Presave hook to hash password before saving
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = bcrypt.hash(this.password, salt);
  next();
});

// Password Verification

UserSchema.methods.isValidPassword = async function (password) {
  return bcrypt.compare(this.password, password);
};

const User = mongoose.model("User", UserSchema);

export default User;
