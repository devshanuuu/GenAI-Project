    const  { GoogleGenAI } = require("@google/genai");
    const { z } = require('zod');
    const { zodToJsonSchema } = require('zod-to-json-schema');


    const ai = new GoogleGenAI({
        apiKey: process.env.GOOGLE_API_KEY
    })

    const interviewReportSchema = z.object({
        
        matchScore: z.number().describe('A score between 0 and 100 indicating how well the candidates profile is according to the job describe'),

        technichalQuestions: z.array(z.object({
            question: z.string().describe('The technical question can be asked in the interview'),
            intention: z.string().describe('The intention behind asking this question'),
            answer: z.string().describe('How to answer this question, what points to cover')
        })).describe('Technical questions that can be asked in the interview, along with the intention behind asking those questions and how to answer them.'),

        behaviouralQuestions: z.array(z.object({
            question: z.string().describe('The behavioural question can be asked in the interview'),
            intention: z.string().describe('The intention behind asking this question'),
            answer: z.string().describe('How to answer this question, what points to cover')
        })).describe('Behavioural questions that can be asked in the interview, along with the intention behind asking those questions and how to answer them.'),

        skillGap: z.array(z.object({
            skill: z.string().describe('The skill in which the candidate is lacking'),
            severity: z.enum(['low', 'medium', 'high']).describe('The severity of the skill gap')
        })).describe('The skills in which the candidate is lacking, along with the severity of the skill gap.'),

        preparationPlan: z.array(z.object({
            day: z.number().describe('The day number in the preparation plan, starting from 1'),
            focusArea: z.string().describe('The area of focus for that day in the preparation plan'),
            tasks: z.array(z.string()).describe('The tasks to be completed on that day in the preparation plan')
        })).describe('A day-wise preparation plan for the candidate to improve their chances of getting selected for the job.')
    })

    async function generateInterviewReport({resume, jobDescription, selfDescription}) {
        
        const prompt = `Generate a comprehensive interview preparation report based on the following information:
        Resume: ${resume}
        selfDescription: ${selfDescription}
        Job Description: ${jobDescription}
        The report should be in JSON format and include the following sections:
        1. Match Score: A score between 0 and 100 indicating how well the candidate's profile matches the job description.
        2. Technical Questions: A list of technical questions that can be asked in the interview, along with the intention behind asking those questions and how to answer them.
        3. Behavioural Questions: A list of behavioural questions that can be asked in the interview, along with the intention behind asking those questions and how to answer them.
        4. Skill Gap Analysis: An analysis of the skills in which the candidate is lacking, along with the severity of the skill gap.
        5. Preparation Plan: A day-wise preparation plan for the candidate to improve their chances of getting selected for the job.`
        
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: {
             responseMimeType: "application/json",
             responseSchema: zodToJsonSchema(interviewReportSchema)
}
        })

       return json.parse(response.text);
        
    }

    module.exports =  generateInterviewReport