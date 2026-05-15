const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
})

async function generateInterviewReport({ resume, jobDescription, selfDescription }) {

    const prompt = `Generate an interview preparation report for a candidate with the following details:
Resume: ${resume}
Job Description: ${jobDescription}
Self Description: ${selfDescription}`

    const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: "object",
                properties: {
                    technicalQuestions: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                question:  { type: "string" },
                                intention: { type: "string" },
                                answer:    { type: "string" }
                            },
                            required: ["question", "intention", "answer"]
                        }
                    },
                    behaviouralQuestions: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                question:  { type: "string" },
                                intention: { type: "string" },
                                answer:    { type: "string" }
                            },
                            required: ["question", "intention", "answer"]
                        }
                    },
                    skillGaps: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                skill:    { type: "string" },
                                severity: { type: "string", enum: ["low", "medium", "high"] }
                            },
                            required: ["skill", "severity"]
                        }
                    },
                    preparationPlan: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                day:       { type: "number" },
                                focusArea: { type: "string" },
                                tasks:     { type: "array", items: { type: "string" } }
                            },
                            required: ["day", "focusArea", "tasks"]
                        }
                    }
                },
                required: ["technicalQuestions", "behaviouralQuestions", "skillGaps", "preparationPlan"]
            }
        }
    })

    console.log(response.text);
    return JSON.parse(response.text);
}

module.exports = generateInterviewReport;