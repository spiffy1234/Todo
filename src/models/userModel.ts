import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
  },
  email: {
    type: String,
    required: [true, "must provide email"],
    unique: [true, "email already exist"],
  },
  password: {
    type: String,
    required: [true, "its must required"],
  },
  mobile: {
    type: String,
    required: [true, "its must provided"],
  },
});
const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
