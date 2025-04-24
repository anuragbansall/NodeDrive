export const uploadFile = async (req, res, next) => {
  try {
    const file = req.file;
    const user = req.user;

    if (!file) {
      const error = new Error("Please upload a file");
      error.status = 400;
      throw error;
    }

    // Todo: Upload file to firebase storage

    res.status(200).json({
      message: "File uploaded successfully",
      file: {
        name: file.originalname,
        size: file.size,
        type: file.mimetype,
        buffer: file.buffer.toString("base64"),
      },
      user: {
        id: user.id,
        name: user.name,
      },
    });
  } catch (error) {
    next(error);
  }
};
