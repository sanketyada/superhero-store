import cloudinaryModule from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const cloudinary = cloudinaryModule.v2;

cloudinary.config({
  cloud_name: 'dxptmoqve',
  api_key: '964615593112113',
  api_secret: 'XbKAbBubyD921ZEiEhpjzGAFcec',
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'SuperheroAvatars',
    allowed_formats: ['jpeg', 'png', 'jpg'],
  },
});

export { cloudinary, storage };
