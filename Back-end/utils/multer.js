const multer = require("multer");
const path = require("path");

// Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" 
    || file.mimetype == "application/msword" 
    || file.mimetype == "application/vnd.ms-powerpoint" 
    || file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
    || file.mimetype == "application/vnd.openxmlformats-officedocument.presentationml.presentation" 
    || file.mimetype == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
    || file.mimetype == "application/vnd.ms-excel"
    || file.mimetype == "application/pdf")
     {
      cb(null, true);
      // let ext = path.extname(file.originalname);  
      // if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      //   cb(new Error("File type is not supported"), false);
      //   return;
    } else {
      cb(new Error("File type is not supported"), false);
      return;
    };
  }
});

