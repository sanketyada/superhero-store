// server/config/multerCloudinary.js
import multer from 'multer';
import multerStorageCloudinary from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js';

const storage = multerStorageCloudinary({
  cloudinary,
  folder: 'superhero_avatars',  
  allowedFormats: ['jpg', 'jpeg', 'png'],  
});

const upload = multer({ storage });

export default upload;
