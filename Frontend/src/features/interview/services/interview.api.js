import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
    withCredentials: true
})

export const generateInterviewReport = async ({ jobDescription, selfDescription, resumeFile }) => {
    
    // FormData helps us to send multipart/form-data, which is necessary for file uploads. We append the job description, self description, and the resume file to the FormData object before sending it in the POST request to the backend API
    const formData = new FormData()
    formData.append("jobDescription", jobDescription)
    formData.append("selfDescription", selfDescription)
    formData.append("resume", resumeFile)

    const response = await api.post("/api/interview/", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

    return response.data

}

export const getInterviewReportById = async (interviewId) => {
    
    // We make a GET request to the backend API to fetch the interview report by its ID. The response contains the interview report data, which we return from the function.
    const response = await api.get(`/api/interview/report/${interviewId}`)

    return response.data
}

export const getAllInterviewReports = async () => {
    
    // We make a GET request to the backend API to fetch all interview reports for the authenticated user. The response contains an array of interview reports, which we return from the function.
    const response = await api.get("/api/interview/")

    return response.data
}