const multer = require("multer");
const { diskStorage } = multer;
const { extname } = require('path');


const audioFilter = (req, file, cb) => {
  console.log(file.mimetype);
  if (file.mimetype === "audio/mpeg" ||
  file.mimetype === "audio/wave") {
    cb(null, true);
  } else {
    cb("Please upload only audio files (MP3, WAV, etc.).", false);
  }
};

var storage = diskStorage({
  destination: (req, file, cb) => {
    // const destinationPath = __basedir + "/public/";
    const destinationPath = `${req.protocol}://${req.get('host')}/public/`;
    console.log("Destination Path:", destinationPath);
    cb(null,destinationPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + extname(file.originalname));
  },
});


var uploadFile = multer({ storage: storage, fileFilter: audioFilter });

module.exports = {
  uploadFile
}