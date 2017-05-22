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
      console.log(photos[0].photos);
      res.render("photos/index");
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
      Photos.update(
        {},
        {
          $push: {
            photos: {
              url: data.Location,
              uploader: req.session.passport.user,
              desc: req.body.photo.desc
            }
          }
        }
      );
      // User.find;
      // return Photos.update({photos}, {$push: {photos: photoObj}});
      req.flash("success", "Photo created!");
      res.redirect("/photos");
    })
    .catch(next);
});

module.exports = router;
