const express = require("express");
const router = express.Router();

const FileUpload = require("./../services/file_upload");

// ----------------------------------------
// Index
// ----------------------------------------
router.get(["/", "/photos"], (req, res) => {
  // const photos = require("./../data/photos");

  res.render("photos/index");
});

router.get("/photos/new", (req, res) => {
  res.render("photos/new");
});

const mw = FileUpload.single("photo[file]");
router.post("/photos", mw, (req, res, next) => {
  console.log("Files", req.file);
  console.log("user session info", req.user);
  FileUpload.upload({
    data: req.file.buffer,
    name: req.file.originalname,
    mimetype: req.file.mimetype
  })
    .then(data => {
      // User.find;
      // return Photos.update({photos}, {$push: {photos: photoObj}});
      req.flash("success", "Photo created!");
      res.redirect("/photos");
    })
    .catch(next);
});

module.exports = router;
