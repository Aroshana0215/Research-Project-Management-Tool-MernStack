const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    StudentID: {
      type: String,
      required: true,
    },

    GroupName: {
      type: String,
      required: [true, "Please enter your name!"],
      unique: true,
    },
    GroupMembers: [
      {
        user_id: String,
      },
    ],
    Cosupervisor: {
      type: String,
    },
    Supervisor: {
      type: String,
    },
    leader: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Group", groupSchema);
