const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const Assignment = require("../models/assignmentModel");

router.post("/upload_assignment", upload.single("assignment"), async (req, res) => {
  try {
    const file = req.file
    // Upload assignment to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path , {
      folder : 'assignment',
    });

    // Create new user
    let assignment = new Assignment({
      name: req.body.name,
      assignment: result.secure_url,
      fileName : file.originalname ,
      cloudinary_id: result.public_id,
    });
    // Save assignment
    await assignment.save();
    res.json(assignment);
  } catch (err) {
    console.log(err);
  }
});

router.get("/get_assignments", async (req, res) => {
  try {
    let assignment = await Assignment.find({
      folder : 'assignment' ,
      resource_type : "auto"
    });
    res.json(assignment);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    // Find assignment by id
    let assignment = await Assignment.findById(req.params.id);
    // Delete assignment from cloudinary
    await cloudinary.uploader.destroy(assignment.cloudinary_id);
    // Delete assignment from db
    await assignment.remove();
    res.json(assignment);

  } catch (err) {
    console.log(err);
  }
});

router.put("/edit/:id", upload.single("assignment"), async (req, res) => {
  try {
    let assignment = await Assignment.findById(req.params.id);
    // Delete assignment from cloudinary
    await cloudinary.uploader.destroy(assignment.cloudinary_id);
    // Upload assignment to cloudinary
    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }
    const data = {
      name: req.body.name || assignment.name,
      fileName: req.file.originalname || assignment.fileName,
      assignment: result?.secure_url || assignment.assignment,
      cloudinary_id: result?.public_id || assignment.cloudinary_id,
    };
    assignment = await Assignment.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(assignment);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    // Find assignment by id
    let assignment = await Assignment.findById(req.params.id);
    res.json(assignment);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
