const express = require("express");
const {
  groupRegister,
  getMyGroupDetails,
  getAGroup,
  deletGroup,
  allGrops,
  getMutualStudents,
  updateGroup,
  getMutualStaff,
  getLeader,
} = require("../controllers/GroupCtrl.js");
const router = express.Router();

router.route("/register").post(groupRegister);
router.route("/list").get(allGrops);
router.route("/myGroup/:id").get(getMyGroupDetails);
router.route("/getAgroup/:id").get(getAGroup);
router.route("/mutualUsers").get(getMutualStudents);
router.route("/all//mutualStaff").get(getMutualStudents);
router.route("/:id").delete(deletGroup);
router.route("/update/:id").put(updateGroup);
router.route("/leader").get(getLeader);

module.exports = router;
