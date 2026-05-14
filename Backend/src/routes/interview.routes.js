const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const upload = require('../middleware/file.middleware');

const interviewRouter = express.Router();

interviewRouter.post('/', authMiddleware.authUser, upload.single('resume') interviewController.genInterviewReport)

module.exports = interviewRouter;