const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const upload = require('../middleware/file.middleware');
const interviewController = require('../controllers/interview.controller');

const interviewRouter = express.Router();

interviewRouter.post('/', authMiddleware.authUser, upload.single('resume'), interviewController.genInterviewReportController)
interviewRouter.get('/report/:interviewId', authMiddleware.authUser, interviewController.getInterviewReportController)
interviewRouter.get('/', authMiddleware.authUser, interviewController.getAllInterviewReportsController)

module.exports = interviewRouter;