const mongoose = require('mongoose');


const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    intention: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
}, {_id: false})

const behaviouralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    intention: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
}, {_id: false} ) 

const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: true
    },
    severity: {
        type: String,
        enum: ['low', 'medium', 'high'],
        required: true
    }
}, {_id: false})

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: true
    },
    focusArea: {
        type: String,
        required: true
    },
    tasks: [{ 
        type: String,
        required: true
    }]
})

// The main schema for the interview report, which includes all the fields and sub-schemas defined above. 
const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: true
    },
    resume: {
        type: String
    },
    selfDescription: {
        type: String
    },
    technicalQuestions: [technicalQuestionSchema],
    behaviouralQuestions: [behaviouralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})

const interviewReportModel = mongoose.model('InterviewReport', interviewReportSchema)
module.exports = interviewReportModel