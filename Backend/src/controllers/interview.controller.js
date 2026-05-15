const pdfParse = require('pdf-parse');

async function genInterviewReport(req, res) {
    const resumeFile = req.file
    const resumeContent = pdfParse(req.file.buffer)

    const {selfDesciption, jobDescription} = req.body
}

module.exports = { genInterviewReport }