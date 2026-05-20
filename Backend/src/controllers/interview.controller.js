const pdfParse = require('pdf-parse');
const interviewReportModel = require('../models/interviewreport.model');
const  generateInterviewReport  = require('../services/ai.service');

// Controller to handle interview report generation
async function genInterviewReportController(req, res) {
    
    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()

    const {jobDescription, selfDescription} = req.body

    const interviewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        jobDescription,
        selfDescription
    })

    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        jobDescription,
        selfDescription,
        ...interviewReportByAi
    })

    res.status(201).json({
        message: 'Interview report generated successfully',
        interviewReport
    })
}

// Controller to fetch interview report by ID
async function getInterviewReportController(req, res) {
    const { interviewId } = req.params
    const interviewReport = await interviewReportModel.findOne({_id: interviewId, user: req.user.id})

    if(!interviewReport){
        return res.status(404).json({
            message: 'Interview report not found'
        })
    }

    res.status(200).json({
        message: 'Interview report fetched successfully',
        interviewReport
    })
}

async function getAllInterviewReportsController(req, res) {
    const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -jobDescription -selfDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "Interview reports fetched successfully.",
        interviewReports
    })
}


module.exports = { genInterviewReportController, getInterviewReportController, getAllInterviewReportsController }