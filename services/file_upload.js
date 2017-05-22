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
        resolve(data);
      }
    });
  });
};

FileUploader.remove = id => {
  // Configure the request
  const options = {
    Bucket: bucket,
    Key: id
  };

  return new Promise((resolve, reject) => {
    s3.deleteObject(options, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

module.exports = FileUploader;
