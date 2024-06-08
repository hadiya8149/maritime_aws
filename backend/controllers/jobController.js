import {db} from '../config/dbConnection.js';

// Create job
export const  createJob =async (req, res) => {
    const { job_title, job_description, requirements, location, salary, employer_id, PostingDate, ExpiryDate } = req.body.body;
    console.log(req.body)
    console.log(job_title, job_description, requirements, location, salary, employer_id, PostingDate, ExpiryDate)
    const sql = `INSERT INTO jobs (job_title, job_description, requirements, location, salary, employer_id, PostingDate, ExpiryDate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
    const values = [job_title, job_description, requirements, location, salary, employer_id, PostingDate, ExpiryDate];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            res.status(500).json({ error: 'Error inserting data' });
            return;
        }
        console.log('Data inserted successfully');
        res.status(201).json({
            success : true,
            data : result.rows,
            message: 'Job created successfully'
        });
    });
};

// Update job by ID
export const updateJob = async (req, res) => {
    const {job_id, job_title, job_description, requirements, location, salary, ExpiryDate } = req.body.body;
    console.log("req.body",req.body.body)
    const sql = `UPDATE jobs
    SET job_title = $1,
        job_description = $2,
        requirements = $3,
        location = $4,
        salary = $5,
        ExpiryDate = $6
    WHERE job_id = $7;`;    
    const values = [job_title, job_description, requirements, location, salary, ExpiryDate, job_id];

    const response = await db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            res.status(500).json({ error: 'Error updating job' });
        }
        else{
            res.status(200).json({ 
                success : true,
                message: 'Job updated successfully' });
        
        }
        });
};

// Delete job by ID
export const deleteJob = (req, res) => {
    const jobId = req.params.id;

    const sql = `DELETE FROM jobs WHERE job_id = ?`;
    const values = [jobId];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            res.status(500).json({ error: 'Error deleting job' });
            return;
        }
        console.log('Job deleted successfully');
        res.status(200).json({ 
            success : true,
            message: 'Job deleted successfully' });
    });
};

// Get job by ID
export const getJobById = (req, res) => {
    const jobId = req.params.id;

    const sql = `SELECT * FROM jobs WHERE job_id = $1`;
    const values = [jobId];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            res.status(500).json({ error: 'Error fetching job' });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Job not found' });
            return;
        }
        res.json({
            success : true,
            data : result.rows,
            msg: "Fetch job data successfully."
        });
    });
};
export const getJobByEmployerId = (req, res) => {
    const employerId = req.params.id;
    console.log(req.params.id)
    const sql = `SELECT * FROM jobs WHERE employer_id = $1`;
    db.query(sql, [employerId], (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            res.status(500).json({ error: 'Error fetching job' });
        }
        res.json({
            success : true,
            data : result.rows,
            msg: "Fetch job data successfully."
        });
    });
};

// Get all jobs
export const getAllJobs = (req, res) => {
    const sql = `SELECT * FROM jobs`;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            res.status(500).json({ error: 'Error fetching jobs' });
            return;
        }
        res.json({
            success : true,
            data : result.rows,
            msg: "Fetch All jobs data successfully."
        });
    });
};
