import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    role: {
      type: String,
      enum: ["admin", "member"],
      default: "member",
    },
  },
  { timestamps: true }
);

// 🔥 FIX HERE (IMPORTANT)
const User =
  mongoose.models.User || mongoose.model("User", userSchema);

export default User;