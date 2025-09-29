import mongoose from "mongoose";

// Create schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

// Create model
const User = mongoose.model("User", userSchema);

// Export default (so we can `import User from ...`)
export default User;
