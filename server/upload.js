const express = require('express');
const multer = require('multer');
const cloudinary = require('../utils/cloudinary');
const Post = require('../models/Post'); // Assuming you want to save the image URL in the Post model

const router = express.Router();

// Configure multer for temporary file storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload endpoint
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).send({ message: 'No file uploaded' });
    }

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      { folder: 'mindful2' }, // Optional folder name in Cloudinary
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return res.status(500).send({ message: 'Image upload failed' });
        }

        // Return the Cloudinary URL
        res.status(201).send({ imageUrl: result.secure_url });
      }
    );

    // Pipe the file buffer to Cloudinary
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'mindful2' },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return res.status(500).send({ message: 'Image upload failed' });
        }

        // Return the Cloudinary URL
        res.status(201).send({ imageUrl: result.secure_url });
      }
    );

    stream.end(file.buffer);
  } catch (error) {
    console.error('Error uploading image:', error);
    res
      .status(500)
      .send({ message: 'An error occurred while uploading the image' });
  }
});

module.exports = router;
