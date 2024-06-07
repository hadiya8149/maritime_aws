import {db} from '../config/dbConnection.js';
import { upload } from '../middleware/upload.js';
// Create job application
export const createJobApplication = (req, res) => {
    const { jobSeeker_id, job_id, AppDate, Status, ResumeURL } = req.body.body;
    const filePath = req.file;
    console.log(jobSeeker_id, job_id, AppDate, Status, ResumeURL)
    
    const sql = `INSERT INTO jobapplications (jobSeeker_id, job_id, AppDate, Status, ResumeURL) VALUES (?, ?, ?, ?, ?)`;
    const values = [jobSeeker_id, job_id, AppDate, Status, ResumeURL];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            res.status(500).json({ error: 'Error inserting data' });
            return;
        }
        console.log('Data inserted successfully');
        res.status(201).json({
            success : true,
            data : result,
            message: 'Job application created successfully'
        });
    });
};

// Update job application by ID
export const updateJobApplication = (req, res) => {
    const appId = req.params.id;
    const { jobSeeker_id, job_id, AppDate, Status, ResumeURL } = req.body;

    const sql = `UPDATE jobapplications SET jobSeeker_id = ?, job_id = ?, AppDate = ?, Status = ?, ResumeURL = ? WHERE app_id = ?`;
    const values = [jobSeeker_id, job_id, AppDate, Status, ResumeURL, appId];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            res.status(500).json({ error: 'Error updating job application' });
            return;
        }
        console.log('Job application updated successfully');
        res.json({ 
            success : true,
            message: 'Job application updated successfully' });
    });
};

// Delete job application by ID
export const deleteJobApplication = async (req, res) => {
    const appId = req.params.id;

    const sql = `DELETE FROM jobapplications WHERE app_id = ?`;
    const values = [appId];
    console.log('delete from jobappliccation')
    await db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            res.status(500).json({ error: 'Error deleting job application' });
            return;
        }
        console.log('Job application deleted successfully');
        console.log(result)
        res.status(200).json({ 
            success : true,
            message: 'Job application deleted successfully' });
    });
};

// Get job application by ID
export const getJobApplicationByApplicationId = (req, res) => {
    const appId = req.params.id;

    const sql = `SELECT * FROM jobapplications WHERE app_id = ?`;
    const values = [appId];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            res.status(500).json({ error: 'Error fetching job application' });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Job application not found' });
            return;
        }
        const jobApplication = result[0];
        res.json({
            success : true,
            data : jobApplication,
            msg: "Fetch job application data successfully."
        });
    });
};
export const getJobApplicationsByJobSeekerId = (req, res) => {
    const jobseeker_id = req.params.id;

    const sql = `select job_title, jobapplications.job_id,jobapplications.AppDate, jobapplications.app_id from jobapplications inner join jobs on jobapplications.job_id=jobs.job_id WHERE jobapplications.jobSeeker_id=?; `;
    const values = [jobseeker_id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            res.status(500).json({ error: 'Error fetching job application' });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Job application not found' });
            return;
        }
        const jobApplication = result;
        res.json({
            success : true,
            data : jobApplication,
            msg: "Fetch job application data successfully."
        });
    });
};
// get applicants data 
export const getJobApplicationsByJobId = (req, res) => {
    const job_id = req.params.id;

    const sql = `SELECT * FROM jobapplications WHERE job_id = ?`;
    const values = [job_id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            res.status(500).json({ error: 'Error fetching job application' });
            return;
        }
        console.log(result)
        res.status(200).json({
            success : true,
            data : result,
            msg: "Fetch job application data successfully."
        });
    });
};
// Get all job applications
export const getAllJobApplications = (req, res) => {
    const sql = `SELECT * FROM jobapplications`;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            res.status(500).json({ error: 'Error fetching job applications' });
            return;
        }
        res.json({
            success : true,
            data : result,
            msg: "Fetch All job applications data successfully."
        });
    });
};
