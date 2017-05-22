const express = require("express");
const router = express.Router();
const models = require("../models");
const Photos = models.Photos;
const User = models.User;
const FileUpload = require("./../services/file_upload");

// ----------------------------------------
// Index
// ----------------------------------------
router.get("/", (req, res, next) => {
  Photos.find({})
    .then(photos => {
      console.log(photos);
      res.render("photos/index", {photos: photos});
    })
    .catch(next);
});

router.get("/new", (req, res) => {
  res.render("photos/new");
});

const mw = FileUpload.single("photo[file]");
router.post("/", mw, (req, res, next) => {
  FileUpload.upload({
    data: req.file.buffer,
    name: req.file.originalname,
    mimetype: req.file.mimetype
  })
    .then(data => {
      return Photos.create({
        photos: {
          url: data.Location,
          uploader: req.session.passport.user,
          desc: req.body.photo.desc,
          key: req.file.key
        }
      });
    })
    .then(photo => {
      req.flash("success", "Photo created!");
      res.redirect("/photos");
    })
    .catch(next);
});

router.delete("/:id", (req, res) => {
  console.log("id from delete", req.params.id);
  Photos.findById(req.params.id, {_id: 0, key: 1}).then(photo => {
    console.log("photo for delete", photo);
  });
});

module.exports = router;
