const pdfParse = require('pdf-parse');
const interviewReportModel = require('../models/interviewreport.model');
const  generateInterviewReport  = require('../services/ai.service');

async function genInterviewReportController(req, res) {
    
    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()

    const {selfDesciption, jobDescription} = req.body

    const interviewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDesciption,
        jobDescription
    })

    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAi
    })

    res.status(201).json({
        message: 'Interview report generated successfully',
        interviewReport
    })
}

module.exports = { genInterviewReportController }