const AWS = require("aws-sdk");
AWS.config.update({region: "us-east-2"});
const s3 = new AWS.S3();
const bucket = process.env.AWS_S3_BUCKET;
const mime = require("mime");
const md5 = require("md5");
const _ = require("lodash");
const path = require("path");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({storage});

const FileUploader = {};

FileUploader.single = field => upload.single(field);

FileUploader.upload = file => {
  const extension = mime.extension(file.mimetype);
  return new Promise((resolve, reject) => {
    const options = {
      Bucket: bucket,
      Key: `${md5(Date.now())}.${extension}`,
      Body: file.data
    };

    s3.upload(options, (err, data) => {
      if (err) {
        reject(err);
      } else {
        console.log("data to be resolved from .upload", data);
        resolve(data);
      }
    });
  });
};

// FileUploader.remove = id => {
//   // Configure the request
//   const options = {
//     Bucket: bucket,
//     Key: id
//   };
//
//   return new Promise((resolve, reject) => {
//     s3.deleteObject(options, (err, data) => {
//       // Reject if error
//       if (err) {
//         reject(err);
//       } else {
//         // Delete the photo from the JSON
//         // file-based database
//         // if successful and resolve
//         // the photo data
//         const photos = require(PHOTO_DATA_PATH);
//         const photo = _.clone(photos[id]);
//         delete photos[id];
//         _writePhotoDataFile(photos);
//         resolve(photo);
//       }
//     });
//   });
// };

module.exports = FileUploader;
