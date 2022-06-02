const asyncHandler = require("express-async-handler");
const Topics = require("../models/TopicModel.js");
const user = require("../models//userModels.js");
// const generateToken = require("../utils/generateToken");

const topic = asyncHandler(async (req, res) => {
  const { StudentID, topicName, description, feedBack, status } = req.body;

  const topicExits = await Topics.findOne({ topicName });

  if (topicExits) {
    res.status(400);
    throw new Error("This topic name already exits");
  }

  const User = await Topics.create({
    StudentID,
    topicName,
    description,
    feedBack,
    status,
  });

  if (User) {
    res.status(201).json({
      _id: User._id,
      StudentID: User.StudentID,
      topicName: User.topicName,
      description: User.description,
      feedBack: User.feedBack,
      status: User.status,
    });
  } else {
    res.status(400);
    throw new Error("Error occured!");
  }
});

const allTopic = asyncHandler(async (req, res) => {
  Topics.find()
    .then((Topics) => res.json(Topics))
    .catch((err) => res.status(400).json("Error: " + err));
});

const oneTopic = asyncHandler(async (req, res) => {
  const ad = await Topics.findById(req.params.id);

  if (ad) {
    res.json(ad);
  } else {
    res.status(404).json({ message: "this topic not found" });
  }
});

const usersTopic = asyncHandler(async (req, res) => {
  const ad = await Topics.find({ StudentID: req.params.id });

  if (ad) {
    res.json(ad);
  } else {
    res.status(404).json({ message: "this topic not found" });
  }
});

const deleteTopic = asyncHandler(async (req, res) => {
  Topics.findByIdAndDelete(req.params.id)
    .then(() => res.json("Topic  has been removed."))
    .catch((err) => res.status(400).json("Error: " + err));
});

const updateTopic = asyncHandler(async (req, res) => {
  Topics.findById(req.params.id)
    .then((Topics) => {
      Topics.StudentID = req.body.StudentID;
      Topics.topicName = req.body.topicName;
      Topics.description = req.body.description;
      Topics.feedBack = req.body.feedBack;
      Topics.status = req.body.status;

      Topics.save()
        .then(() => res.json("Topic details updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = {
  topic,
  allTopic,
  updateTopic,
  deleteTopic,
  oneTopic,
  usersTopic,
};
