const express = require('express');
const route = express.Router(); // Use Router for modular routes
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const multerStorageCloudinary = require('multer-storage-cloudinary').CloudinaryStorage; // Correct import
const { userCourseSearch, userCoursesGet, userAllCoursesGet, userDeleteCourse, userCoursePost } = require("../controller/userCourseController");

route.get("/userCourseSearch", userCourseSearch);
route.get("/userCoursesGet/:id", userCoursesGet);
route.get("/userAllCoursesGet", userAllCoursesGet);

// Setup Cloudinary storage for multer
const storage = new multerStorageCloudinary({
    cloudinary: cloudinary,
    folder: 'courses',
    allowedFormats: ['jpg', 'png', 'jpeg'],
});

const upload = multer({ storage: storage });

// Route for posting a course
route.post("/userCoursePost", upload.single('image'), userCoursePost);

route.delete("/userDeleteCourse/:courseId", userDeleteCourse);

module.exports = route;
