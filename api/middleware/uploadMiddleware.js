import multer from "multer";
import * as fs from "fs";

// Configure multer storage and file name
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Create multer upload instance
const upload = multer({ storage: storage });

// Custom file upload middleware
const uploadMultipleFilesMiddleware = (req, res, next) => {
  // Use multer upload instance limiting to 5 files hence the 5 in the array
  upload.array("thumbnail", 5)(req, res, (err) => {
    if (err) {
      res.status(400);
      next(new Error(err.message));
    }

    // Retrieve uploaded files
    const files = req.files;
    const errors = [];

    // Validate file types and sizes
    files.forEach((file) => {
      const allowedTypes = [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "text/plain",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.mimetype)) {
        errors.push(
          `Invalid file type: ${file.originalname}. Accepted formats are images, text files, pdfs and word documents.`
        );
      }

      if (file.size > maxSize) {
        errors.push(`File too large: ${file.originalname}`);
      }
    });

    // Handle validation errors
    if (errors.length > 0) {
      // Remove uploaded files
      files.forEach((file) => {
        fs.unlinkSync(file.path);
      });
      res.status(400);
      next(new Error(errors));
    }

    // Attach files to the request object
    req.files = files;

    // Proceed to the next middleware or route handler
    next();
  });
};

const uploadSingleFilesMiddleware = (req, res, next) => {
  // Use multer upload instance limiting to 5 files hence the 5 in the array
  upload.single("file", 5)(req, res, (err) => {
    if (err) {
      res.status(400);
      next(new Error(err.message));
    }
    const file = req.file;
    if (!file || file === undefined) {
      next();
    } else {
      const errors = [];
      const allowedTypes = [
        "image/webp",
        "image/tiff",
        "image/svg+xml",
        "image/png",
        "image/jpeg",
        "image/vnd.microsoft.icon",
        "image/gif",
        "image/bmp",
      ];
      const maxSize = 5 * 1024 * 1024; // 5MB

      try {
        if (!allowedTypes.includes(file.mimetype)) {
          errors.push(
            `Invalid file type: ${file.originalname}. Accepted formats are images, text files, pdfs and word documents.`
          );
        }
        if (file.size > maxSize) {
          errors.push(`File too large: ${file.originalname}`);
        }
        // Handle validation errors
        if (errors.length > 0) {
          // Remove uploaded files
          fs.unlinkSync(file.path);
          res.status(400);
          throw new Error(errors);
        }
        // Attach files to the request object
        req.files = file;
        // Proceed to the next middleware or route handler
        next();
      } catch (error) {
        next(new Error(error.message));
      }
    }
  });
};

const uploadSingleVideoFileMiddleware = (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      res.status(400);
      next(new Error(err.message));
    }
    const file = req.file;
    if (!file || file === undefined) {
      res.status(204);
      throw new Error("Please upload a video.");
    }
    const errors = [];
    const allowedTypes = [
      "video/x-flv",
      "video/x-ms-wmv",
      "video/x-msvideo",
      "video/quicktime",
      "video/3gpp",
      "video/MP2T",
      "application/x-mpegURL",
      "video/mp4",
    ];
    const maxSize = 40 * 1024 * 1024; // 40MB

    try {
      if (!allowedTypes.includes(file.mimetype)) {
        errors.push(
          `Invalid file type: ${file.originalname}. Please upload a video file.`
        );
      }
      if (file.size > maxSize) {
        errors.push(
          `File too large: ${file.originalname}. Please ensure the video is less than 40 MB`
        );
      }
      // Handle validation errors
      if (errors.length > 0) {
        // Remove uploaded files
        fs.unlinkSync(file.path);
        res.status(400);
        throw new Error(errors);
      }
      // Attach files to the request object
      req.files = file;
      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      next(new Error(error.message));
    }
  });
};

export {
  uploadMultipleFilesMiddleware,
  uploadSingleFilesMiddleware,
  uploadSingleVideoFileMiddleware,
};
