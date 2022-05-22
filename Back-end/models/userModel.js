const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      trim: true,
      unique: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      min: 6,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/v-tch/image/upload/v1633974720/aoktkfxpyjrupe8hwf38.png",
    },
  },
  { timestamp: true }
);

const User = model("User", userSchema);

module.exports = User;
