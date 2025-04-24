import multer from "multer";

const storage = multer.memoryStorage(); // Store files in memory temporarily for processing
const upload = multer({ storage });

export default upload;
