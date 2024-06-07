import express from 'express';
import { createJobSeeker, deleteJobSeeker, getJobSeekerById, getJobSeekerByUserId, getAllJobSeekers, updateJobSeeker } from '../controllers/jobseekerController.js';

const jobSeekerRouter = express.Router();

// Create job seeker
jobSeekerRouter.post('/create_jobseeker', createJobSeeker);

// Update job seeker
jobSeekerRouter.put('/update_jobseeker/:id', updateJobSeeker);

// Delete job seeker
jobSeekerRouter.delete('/delete_jobseeker/:id', deleteJobSeeker);

// Get job seeker by ID
jobSeekerRouter.get('/jobseeker/:id', getJobSeekerById);
jobSeekerRouter.get('/jobseeker_by_user_id/:id', getJobSeekerByUserId);

// Get all job seekers
jobSeekerRouter.get('/jobseekers', getAllJobSeekers);

export default jobSeekerRouter;
