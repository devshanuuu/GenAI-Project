const pdfParse = require('pdf-parse');
const interviewReportModel = require('../models/interviewreport.model');
const generateInterviewReport = require('../services/ai.service');

// Controller to handle interview report generation
async function genInterviewReportController(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: 'Resume file is required (PDF only)'
            });
        }

        const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText();

        const { jobDescription, selfDescription } = req.body;

        const interviewReportByAi = await generateInterviewReport({
            resume: resumeContent.text,
            jobDescription,
            selfDescription
        });

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeContent.text,
            jobDescription,
            selfDescription,
            ...interviewReportByAi
        });

        res.status(201).json({
            message: 'Interview report generated successfully',
            interviewReport
        });
    } catch (err) {
        console.error('Generate report error:', err);
        res.status(500).json({ message: 'Failed to generate interview report' });
    }
}

// Controller to fetch interview report by ID
async function getInterviewReportController(req, res) {
    try {
        const { interviewId } = req.params;
        const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id });

        if (!interviewReport) {
            return res.status(404).json({
                message: 'Interview report not found'
            });
        }

        res.status(200).json({
            message: 'Interview report fetched successfully',
            interviewReport
        });
    } catch (err) {
        console.error('Get report error:', err);
        res.status(500).json({ message: 'Failed to fetch interview report' });
    }
}

async function getAllInterviewReportsController(req, res) {
    try {
        const interviewReports = await interviewReportModel.find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .select("-resume -jobDescription -selfDescription -__v -technicalQuestions -behaviouralQuestions -skillGaps -preparationPlan");

        res.status(200).json({
            message: "Interview reports fetched successfully.",
            interviewReports
        });
    } catch (err) {
        console.error('Get all reports error:', err);
        res.status(500).json({ message: 'Failed to fetch interview reports' });
    }
}

module.exports = { genInterviewReportController, getInterviewReportController, getAllInterviewReportsController };