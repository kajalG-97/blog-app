import mongoose from "mongoose";
import validator from "validator";

const Schema = mongoose.Schema;

const profileSchema = new Schema({
  name: String,
  email: String,
  bio: String,
});

const userSchema = new Schema({
  username: String,
  password: { type: String, required: true },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  profile: { type: Schema.Types.ObjectId, ref: "Profile" },
});

export const Profile = mongoose.model("Profile", profileSchema);
export const User = mongoose.model("User", userSchema);
