import File from "../models/File.model.js";

export const uploadFile = async (req, res, next) => {
  try {
    const file = req.file;
    const user = req.user;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // Create a new file document
    const newFile = new File({
      name: file.originalname,
      size: file.size,
      type: file.mimetype,
      publicUrl: file.path,
      user: user._id,
    });

    await newFile.save();

    user.files.push(newFile._id);
    await user.save();

    return res.status(201).json({
      success: true,
      message: "File uploaded successfully",
      data: {
        file: newFile,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getFiles = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    const files = await File.find({ user: user._id }).populate(
      "user",
      "name email"
    );

    return res.status(200).json({
      success: true,
      data: files,
    });
  } catch (error) {
    next(error);
  }
};
