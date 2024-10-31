const express = require('express');
const route = express.Router(); // Use Router() for route definition
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const multerStorageCloudinary = require('multer-storage-cloudinary').CloudinaryStorage;
const { heroEdit, heroGet, heroDelete } = require("../controller/heroSectionController");

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Add your Cloudinary cloud name
    api_key: process.env.CLOUDINARY_API_KEY,       // Add your Cloudinary API key
    api_secret: process.env.CLOUDINARY_API_SECRET    // Add your Cloudinary API secret
});

// Setup Cloudinary storage for multer
const storage = new multerStorageCloudinary({
    cloudinary: cloudinary,
    folder: 'courses', // Specify the folder in Cloudinary
    allowedFormats: ['jpg', 'png', 'jpeg', 'gif'], // Add 'gif' to allowed formats
});

// Setup multer to handle single file upload
const upload = multer({ storage: storage });

route.get("/heroGet", heroGet)

route.delete("/heroDelete", heroDelete)

route.patch("/heroEdit", upload.single('images[]'), heroEdit);

module.exports = route;
