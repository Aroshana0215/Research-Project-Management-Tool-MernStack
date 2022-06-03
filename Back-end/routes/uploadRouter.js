const router = require("express").Router();
const uploadImage = require("../middleware/uploadImage");
const upload = require("../middleware/upload");
const uploadCtrl = require("../controllers/uploadCtrl");
const auth = require("../middleware/auth");

router.post("/upload_avatar", uploadImage, upload ,  auth, uploadCtrl.uploadAvatar);

module.exports = router;
