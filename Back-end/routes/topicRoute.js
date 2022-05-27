const express = require("express");
const {
  topic,
  allTopic,
  updateTopic,
  deleteTopic,
  oneTopic,
} = require("../controllers/TopicCtrl.js");
const router = express.Router();

router.route("/").post(topic);
router.route("/list").get(allTopic);
router.route("/:id").get(oneTopic);
router.route("/:id").put(updateTopic);
router.route("/:id").delete(deleteTopic);

module.exports = router;
