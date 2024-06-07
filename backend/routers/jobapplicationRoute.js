import express from 'express';
import { createJobApplication, deleteJobApplication, getJobApplicationsByJobId, getJobApplicationByApplicationId,getJobApplicationsByJobSeekerId, getAllJobApplications, updateJobApplication } from '../controllers/jobapplicationController.js';
import { upload } from '../middleware/upload.js';
const jobApplicationRouter = express.Router();

// Create job application by employer
jobApplicationRouter.post('/create_job_application', upload, createJobApplication);

// Update job application by employer
jobApplicationRouter.put('/update_job_application/:id', updateJobApplication);

// Delete job application by employer
jobApplicationRouter.delete('/delete_job_application/:id', deleteJobApplication);

// Get a specific job application by application id of job
jobApplicationRouter.get('/job_application/:id', getJobApplicationByApplicationId);
// get job applications by user jobseeker id ; jobs applied by that jobseeker
jobApplicationRouter.get('/applied_jobs_by_user/:id', getJobApplicationsByJobSeekerId);

// get job applicants data by job id; to see how many people applied to that job 
jobApplicationRouter.get('/applicants/:id', getJobApplicationsByJobId);

// Get all job applications
jobApplicationRouter.get('/job_applications', getAllJobApplications);

export default jobApplicationRouter;
