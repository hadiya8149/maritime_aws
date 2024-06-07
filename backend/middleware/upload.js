import multer from 'multer';

// Define storage settings
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    // Generate a unique filename including a timestamp
    const uniqueFilename = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueFilename);
  }
});

// Filter function to accept only PDF and image files
const fileFilter = function(req, file, cb) {
  if (file.mimetype === 'application/pdf' || file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF and image files are allowed!'), false);
  }
};

// Export the multer configuration

export const upload = multer({ 
  storage: storage, 
  limits: { fileSize: 1024 * 1024 * 5 }, // Limiting file size to 5MB
  fileFilter: fileFilter
}).array('files', 5); // Accepting an array of files with field name 'files', limiting to 5 files

// export default upload;
