const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const Submission = require("../models/submissionModel");

router.post("/student_submission", upload.single("submission"), async (req, res) => {
  try {
    const file = req.file
    // Upload submission to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path , {
      folder : 'submission',
      // resource_type : "raw"
    });

    // Create new submission
    let submission = new Submission({
      studentID: req.body.studentID,
      submission: result.secure_url,
      fileName : file.originalname ,
      cloudinary_id: result.public_id,
    });
    // Save submission
    await submission.save();
    res.json(submission);
  } catch (err) {
    console.log(err);
  }
});

router.get("/get_submissions", async (req, res) => {
  try {
    let submission = await Submission.find({
      folder : 'submission' ,
      resource_type : "auto"
    });
    res.json(submission);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    // Find submission by id
    let submission = await Submission.findById(req.params.id);
    // Delete submission from cloudinary
    await cloudinary.uploader.destroy(submission.cloudinary_id);
    // Delete submission from db
    await submission.remove();
    res.json(submission);

  } catch (err) {
    console.log(err);
  }
});

router.put("/edit/:id", upload.single("submission"), async (req, res) => {
  try {
    let submission = await Submission.findById(req.params.id);
    // Delete submission from cloudinary
    await cloudinary.uploader.destroy(submission.cloudinary_id);
    // Upload submission to cloudinary
    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }
    const data = {
      studentID: req.body.studentID || submission.studentID,
      fileName: req.file.originalname || submission.fileName,
      submission: result?.secure_url || submission.submission,
      cloudinary_id: result?.public_id || submission.cloudinary_id,
    };
    submission = await Submission.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(submission);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    // Find submission by id
    let submission = await Submission.findById(req.params.id);
    res.json(submission);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
