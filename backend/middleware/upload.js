import multer from "multer";
import path from "path";

// MEMORY STORAGE
const storage = multer.memoryStorage();

// FILE FILTER
const fileFilter = (
  req,
  file,
  cb
) => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
  ];

  if (
    allowedTypes.includes(
      file.mimetype
    )
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only image files allowed"
      ),
      false
    );
  }
};

// EXPORT
export const upload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize:
      10 * 1024 * 1024,
  },
});