const asyncHandler = require("express-async-handler");
const Groups = require("../models/GroupModel.js");
const user = require("../models/userModels.js");
// const generateToken = require("../utils/generateToken");

const groupRegister = asyncHandler(async (req, res) => {
  const {
    StudentID,
    GroupName,
    GroupMembers,
    Cosupervisor,
    Supervisor,
    leader,
    status,
  } = req.body;

  const groupExits = await Groups.findOne({ GroupName });

  if (groupExits) {
    res.status(400);
    throw new Error("This topic name already exits");
  }

  // check members length
  if (GroupMembers.length > 4)
    return res.status(400).json({
      message: "Only four members allowed to added to a one single Group.",
    });

  // check fields
  if ((!GroupName, !GroupMembers))
    return res.status(400).json({ message: "Please fill in all fields." });

  //check members alredy have a group
  for (const GroupMember of GroupMembers) {
    console.log(GroupMember);
    const User = await user.findById(GroupMember.user_id);
    if (User.havingGroup) {
      return res
        .status(400)
        .json({ msg: GroupMember.name + "  already have a group." });
    }
  }

  const NewGroup = new Groups({
    StudentID,
    GroupName,
    GroupMembers,
    Cosupervisor,
    Supervisor,
    leader,
    status,
  });

  const savedGroup = await NewGroup.save();

  for (const GroupMember of savedGroup.GroupMembers) {
    await user.findOneAndUpdate(
      { _id: GroupMember.user_id },
      { havingGroup: true }
    );
  }

  try {
    const leader = await user.findOneAndUpdate(
      { _id: StudentID },
      { isLeader: true }
    );
    console.log("console for leader" + leader);
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({
    msg: "You Have a successfully Completed Group Registration",
    success: true,
  });
  console.log(res);
});

const getMyGroupDetails = asyncHandler(async (req, res) => {
  try {
    const userID = req.params.id;
    const myGroup = await Groups.findOne({ "GroupMembers.user_id": userID });
    res.status(200).json(myGroup);
  } catch (error) {
    res.status(500).json({ msg: error.message });
    console.log(error);
  }
});

const getAGroup = asyncHandler(async (req, res) => {
  try {
    const group_id = req.params.id;
    const group = await Groups.findById(group_id);
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

const allGrops = asyncHandler(async (req, res) => {
  Groups.find()
    .then((Groups) => res.json(Groups))
    .catch((err) => res.status(400).json("Error: " + err));
});
const deletGroup = asyncHandler(async (req, res) => {
  Groups.findByIdAndDelete(req.params.id)
    .then(() => res.json("Group  has been removed."))
    .catch((err) => res.status(400).json("Error: " + err));
});

const getMutualStudents = asyncHandler(async (req, res) => {
  try {
    const users = await user.find({
      role: "student",
      havingGroup: false,
      isLeader: false,
    });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
});

const updateGroup = asyncHandler(async (req, res) => {
  Groups.findById(req.params.id)
    .then((Groups) => {
      Groups.StudentID = req.body.StudentID;
      Groups.GroupName = req.body.GroupName;
      Groups.Cosupervisor = req.body.Cosupervisor;
      Groups.Supervisor = req.body.Supervisor;
      Groups.status = req.body.status;

      Topics.save()
        .then(() => res.json("Group details updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = {
  groupRegister,
  getMyGroupDetails,
  getAGroup,
  deletGroup,
  allGrops,
  getMutualStudents,
  updateGroup,
};
