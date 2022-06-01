const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name !"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Please enter your email !"],
      trim: true,
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Please enter your password !"],
    },

    role: {
      type: Number,
      default: 0, // 0 = user , 1 = admin
    },

    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/af-project/image/upload/v1651039444/avatar/51f6fb256629fc755b8870c801092942_al0mka.png",
    },
    havingGroup: {
      type: Boolean,
      default: false,
    },
    isLeader: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", userSchema);
