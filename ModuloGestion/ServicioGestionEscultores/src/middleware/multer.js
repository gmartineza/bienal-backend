const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'sculptures',  
    format: async () => 'webp',  
    public_id: (req, file) => file.originalname.split('.')[0], 
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
