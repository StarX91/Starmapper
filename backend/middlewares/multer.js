const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp/uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      "starmarg_image" +
        "-" +
        Date.now() +
        "-" +
        req.uid +
        "." +
        path.extname(file.originalname)
    );
  }, // example filename: starmarg_image-1641600000000-12345.png
});

const upload = multer({ storage });

module.exports = upload;
