const studentReviewsModel = require("../model/StudentReviewsModel")

let studentReviewsGet = async (req, res) => {
    try {
        let allStudentsReviews = await studentReviewsModel.find()
        res.status(200).json({
            success: true,
            msg: allStudentsReviews
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error_msg: error.message
        })
    }
}

module.exports = {
    studentReviewsGet
}