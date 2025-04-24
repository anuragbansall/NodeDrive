export const uploadFile = async (req, res, next) => {
  try {
    const file = req.file;
    const user = req.user;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    res.status(200).json({
      message: "File uploaded successfully",
      file: {
        id: file.filename,
        name: file.originalname,
        size: file.size,
        type: file.mimetype,
        publicUrl: file.path,
        user: user.id,
      },
    });
  } catch (err) {
    next(err);
  }
};
