const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PhotosSchema = mongoose.Schema({
  photos: [
    {
      url: {
        type: String
      },
      uploader: {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    }
  ]
});

const Photos = mongoose.model("Photos", PhotosSchema);

module.exports = Photos;