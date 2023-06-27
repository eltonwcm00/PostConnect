import multer from 'multer'

// Configure the storage and file name for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the destination folder for uploaded files
    cb(null, 'public/files');
  },
  filename: function (req, file, cb) {
    // Generate a unique file name for the uploaded file
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.originalname); // Use the original filename
  }
});

// Create the multer upload instance
const upload = multer({ storage: storage });

export { upload }

