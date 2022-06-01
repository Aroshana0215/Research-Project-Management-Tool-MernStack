const mongoose = require("mongoose");
const assignmentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  assignment: {
    type: String,
  },
  fileName: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  },
});

module.exports = mongoose.model("Assignment", assignmentSchema);
