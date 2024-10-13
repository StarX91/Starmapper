const ImageStarmarg = require("../models/imageStarmarg.model");

const getImages = async (req, res, next) => {
  const { uid } = req.params;

  try {
    const userImages = await ImageStarmarg.findOne({ uid });
    if (!userImages) {
      return res.status(404).json({ images: [] });
    }
    return res.status(200).json({ images: userImages.image });
  } catch (error) {
    console.error("Error fetching images:", error);
    return next(error);
  }
};

const uploadImages = async (req, res, next) => {
  const { uid } = req.uid;
  const { images } = req.body;

  try {
    const savedImages = images
      .filter((file) => file.base64 || file.driveLink)
      .map((file) => ({
        name: file.name || "Unnamed file",
        data: file.base64 || null,
        driveLink: file.driveLink || null,
      }));

    if (savedImages.length === 0) {
      return res.status(400).json({ message: "No valid images to upload" });
    }

    const userImages = await ImageStarmarg.findOne({ uid });

    if (userImages) {
      const updatedImages = await ImageStarmarg.findOneAndUpdate(
        { uid },
        { $push: { image: { $each: savedImages } } },
        { new: true }
      );
      return res
        .status(200)
        .json({ message: "Images added successfully", images: updatedImages });
    } else {
      const newImages = new Images({
        uid,
        image: savedImages,
      });
      await newImages.save();
      return res.status(200).json({
        message: "First image uploaded successfully",
        images: newImages,
      });
    }
  } catch (error) {
    console.error("Image upload failed:", error);
    return next(error);
  }
};

module.exports = {
  getImages,
  uploadImages,
};
