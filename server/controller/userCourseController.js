const cloudinary = require('cloudinary').v2;
const freeCourseModel = require("../model/freeCourseModel");
const paidCourseModel = require("../model/paidCourseModel");

const userCourseSearch = async (req, res) => {
    try {
        const { search } = req.query; // Get the search query from the request
        if (!search) {
            return res.status(400).json({ message: "Search query is required." });
        }

        // Use a regular expression to perform a case-insensitive search
        const regex = new RegExp(search, 'i'); // 'i' makes the search case-insensitive

        // Find courses where the title matches or is similar to the search query
        const paid_courses = await paidCourseModel.find({ title: { $regex: regex } });
        const free_courses = await freeCourseModel.find({ title: { $regex: regex } });

        // Combine both arrays into total_courses
        const total_courses = [...paid_courses, ...free_courses];

        // Return the combined courses found
        return res.status(200).json(total_courses);
    } catch (error) {
        console.error("Error searching courses:", error);
        return res.status(500).json({ message: "Server error" });
    }
}

const userCoursesGet = async (req, res) => {
    try {
        const courseType = req.params.id;
        let courses;

        if (courseType === "Free") {
            courses = await freeCourseModel.find();
        } else if (courseType === "Paid") {
            courses = await paidCourseModel.find();
        } else {
            return res.status(400).json({
                success: false,
                msg: "Invalid course type"
            });
        }

        return res.status(200).json({
            success: true,
            msg: courses 
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error_msg: error.message
        });
    }
};

const userAllCoursesGet = async(req,res)=>{
    try {
        const paid_courses = await paidCourseModel.find();
        const free_courses = await freeCourseModel.find();
        const total_courses = [...paid_courses, ...free_courses];
        return res.status(200).json(total_courses);
    } catch (error) {
        console.error("Error searching courses:", error);
        return res.status(500).json({ message: "Server error" });
    }
}

const userDeleteCourse = async (req, res) => {
    const { courseId } = req.params; 
    try {
        const deletedFreeCourse = await freeCourseModel.findByIdAndDelete(courseId);
        const deletedPaidCourse = await paidCourseModel.findByIdAndDelete(courseId);

        if (!deletedFreeCourse && !deletedPaidCourse) {
            return res.status(404).json({ message: "Course not found" });
        }

        return res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        console.error("Error deleting course:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

const userCoursePost = async (req, res) => {
    try {
        const { title, duration, mode, liveSessions, projects, modules, playlist_id } = req.body;
        let imageUrl;

        // Check if an image file was uploaded
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'courses', // Optional: specify a folder in Cloudinary
                transformation: [{ width: 1280, height: 720, crop: 'limit' }],
            });
            imageUrl = result.secure_url; // Get the secure URL for the uploaded image
        } else {
            return res.status(400).json({ message: 'Image upload is required.' });
        }

        // If modules are present, it's a paid course
        if (modules && modules.length > 0) {
            const parsedModules = JSON.parse(modules); // Convert modules from string to object
            const paidCourseData = {
                title,
                duration,
                mode,
                liveSessions,
                projects,
                image: imageUrl,
                modules: parsedModules.map((module, index) => ({
                    id: index + 1, // Assigning an ID based on the index
                    title: module.title,
                    liveClasses: module.liveClasses,
                    projects: module.projects,
                    assignments: module.assignments,
                    content: module.content,
                })),
            };

            const paidCourse = new paidCourseModel(paidCourseData);
            await paidCourse.save();
            return res.status(201).json({ message: 'Paid course added successfully!', course: paidCourse });
        } else {
            // If no modules, it's a free course
            const freeCourseData = {
                title,
                duration,
                mode,
                liveSessions,
                projects,
                image: imageUrl,
                playlist_id, // This is required for free courses
            };

            const freeCourse = new freeCourseModel(freeCourseData);
            await freeCourse.save();
            return res.status(201).json({ message: 'Free course added successfully!', course: freeCourse });
        }
    } catch (error) {
        console.error('Error adding course:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};


module.exports = {
    userCourseSearch,
    userCoursesGet,
    userAllCoursesGet,
    userDeleteCourse,
    userCoursePost
}
