const mongoose = require("mongoose");
const templateSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  template: {
    type: String,
  },
  fileName: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  },
});

module.exports = mongoose.model("Template", templateSchema);
