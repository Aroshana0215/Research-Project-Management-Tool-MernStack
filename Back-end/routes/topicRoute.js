const express = require("express");
const {
  topic,
  allTopic,
  updateTopic,
  deleteTopic,
  oneTopic,
  usersTopic,
} = require("../controllers/TopicCtrl.js");
const router = express.Router();

router.route("/").post(topic);
router.route("/list").get(allTopic);
router.route("/:id").get(oneTopic);
router.route("/UserTopic/:id").get(usersTopic);
router.route("/:id").put(updateTopic);
router.route("/:id").delete(deleteTopic);

module.exports = router;
