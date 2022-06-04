const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema(
  {
    StudentID: {
      type: String,
      required: true,
    },

    topicName: {
      type: String,
      required: [true, "Please enter your name!"],
      unique: true,
    },
    description: {
      type: String,
    },
    feedBack: {
      type: String,
    },
    status: {
      type: String,
    },
    GroupID: {
      type: String,
    },
    GruopName: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Topic", topicSchema);
