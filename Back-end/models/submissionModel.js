const mongoose = require("mongoose");
const submissonSchema = new mongoose.Schema(
  {
    studentID: {
      type: String,
    },
    submission: {
      type: String,
    },
    fileName: {
      type: String,
    },
    cloudinary_id: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Submission", submissonSchema);
