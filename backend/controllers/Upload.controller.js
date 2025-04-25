import File from "../models/File.model.js";
import { v2 as cloudinary } from "cloudinary";

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
      cloudinaryPublicId: file.filename,
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

export const deleteFiles = async (req, res, next) => {
  try {
    const { files } = req.body; // Array of file IDs
    const user = req.user;

    if (!user) throw new Error("User not found");
    if (!files || files.length === 0)
      throw new Error("No files provided for deletion");

    const filesToDelete = await File.find({
      _id: { $in: files },
      user: user._id,
    });

    for (const file of filesToDelete) {
      if (file.cloudinaryPublicId) {
        await cloudinary.uploader.destroy(file.cloudinaryPublicId);
      }
    }

    const deletedFiles = await File.deleteMany({
      _id: { $in: files },
      user: user._id,
    });

    user.files = user.files.filter(
      (fileId) => !files.includes(fileId.toString())
    );
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Files deleted successfully",
      data: {
        deletedCount: deletedFiles.deletedCount,
      },
    });
  } catch (error) {
    next(error);
  }
};
