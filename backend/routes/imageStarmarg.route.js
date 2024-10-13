const express = require("express");
const router = express.Router();
const {
  getImages,
  uploadImages,
} = require("../controllers/imageStarmarg.controller");
const upload = require("../middlewares/multer");

router.get("/:uid", getImages);
router.post("/upload", upload.array("files"), uploadImages);

module.exports = router;
