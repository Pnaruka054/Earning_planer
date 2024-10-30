const mongoose = require('mongoose')

const moduleSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    liveClasses: { type: String, required: true },
    projects: { type: String, required: true },
    assignments: { type: String, required: true },
    content: [{ type: String, required: true }],
});

const paidCourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    duration: { type: String, required: true },
    mode: { type: String, required: true },
    liveSessions: { type: String, required: true },
    projects: { type: String, required: true },
    image: { type: String, required: true },
    gifImage: { type: String, required: true },
    modules: [moduleSchema],
});

const paidCourseModel = mongoose.model('paidCourseModel', paidCourseSchema)

module.exports = paidCourseModel