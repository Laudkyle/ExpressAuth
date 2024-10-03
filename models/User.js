import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Creating the user Schema

const UserSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const StudentSchema = mongoose.Schema({
  firstName: { type: String, required: true},
  lastName: { type: String, required: true},
  age: { type:Number, required: true},
  school: { type: String, required: true },
  books: { type: Array, required: true},
  preferences:{type: String, required:true}
});

// Presave hook to hash password before saving
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Password Verification

UserSchema.methods.isValidPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", UserSchema);

export const Student = mongoose.model('Student', StudentSchema);

export default User;
