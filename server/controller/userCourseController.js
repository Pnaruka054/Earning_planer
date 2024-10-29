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

module.exports = {
    userCourseSearch
}
