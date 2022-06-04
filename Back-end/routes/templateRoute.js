const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const Template = require("../models/templateModel");

router.post("/upload_template", upload.single("template"), async (req, res) => {
  try {
    const file = req.file
    // Upload template to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path , {
      folder : 'template',
    });

    // Create new user
    let template = new Template({
      name: req.body.name,
      template: result.secure_url,
      fileName : file.originalname ,
      cloudinary_id: result.public_id,
    });
    // Save template
    await template.save();
    res.json(template);
  } catch (err) {
    console.log(err);
  }
});

router.get("/get_templates", async (req, res) => {
  try {
    let template = await Template.find({
      folder : 'template' ,
      resource_type : "auto"
    });
    res.json(template);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    // Find template by id
    let template = await Template.findById(req.params.id);
    // Delete template from cloudinary
    await cloudinary.uploader.destroy(template.cloudinary_id);
    // Delete template from db
    await template.remove();
    res.json(template);

  } catch (err) {
    console.log(err);
  }
});

router.put("/edit/:id", upload.single("template"), async (req, res) => {
  try {
    let template = await Template.findById(req.params.id);
    // Delete template from cloudinary
    await cloudinary.uploader.destroy(template.cloudinary_id);
    // Upload template to cloudinary
    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }
    const data = {
      name: req.body.name || template.name,
      fileName: req.file.originalname || template.fileName,
      template: result?.secure_url || template.template,
      cloudinary_id: result?.public_id || template.cloudinary_id,
    };
    template = await Template.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(template);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    // Find template by id
    let template = await Template.findById(req.params.id);
    res.json(template);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
