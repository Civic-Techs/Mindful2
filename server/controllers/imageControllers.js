require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const uploadImage = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'uploads',
            allowed_formats: ['jpg', 'png', 'jpeg'],
        });
        return result.secure_url;
    } catch (error) {
        console.error('Upload Error:', error);
        throw error;
    }
};

module.exports = { uploadImage };

