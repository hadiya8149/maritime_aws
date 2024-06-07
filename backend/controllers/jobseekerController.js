import { db } from "../config/dbConnection.js";

// Create job seeker
export const createJobSeeker = (req, res) => {
    const { jobSeeker_id, user_id, resumeURL, skills, workExperience, education, certifications, languages } = req.body;

    const sql = `INSERT INTO jobseekers (jobSeeker_id, user_id, resumeURL, skills, workExperience, education, certifications, languages) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [jobSeeker_id, user_id, resumeURL, skills, workExperience, education, certifications, languages];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            res.status(500).json({
                success: false,
                error: 'Error inserting data'
            });
            return;
        }
        console.log('Data inserted successfully');
        res.status(201).json({
            success: true,
            message: 'Job seeker created successfully'
        });
    });
};

// Update job seeker by ID
export const updateJobSeeker =async (req, res) => {
    const jobSeekerId = req.params.id;
    const { user_id, name, email, resumeURL, skills, workExperience, education, certifications, languages } = req.body;

    async function updateTable(col, value){
        const sql = `UPDATE jobseekers SET ${col} =? WHERE jobSeeker_id=?;`
        db.query(sql, [value,jobSeekerId], (err,result)=>{
            if(err){
                throw err
            }
            return result
        })
    }
    if (name){
        updateTable('name', name)
    }
    if(email){
    updateTable('email', email)

    }
    if(resumeURL){
    updateTable('resumeURL', resumeURL)
    }
    if(skills){
    updateTable('skills', skills)
        
    }
    if(workExperience){
    updateTable('workExperience', workExperience)
        
    }
    if(education){
        updateTable('education', education)
    }   
    if(languages){
    updateTable('languages', languages)

    }
    if(certifications){
    updateTable('certifications', certifications)

    }

    return res.status(200)
};


// Delete job seeker by ID
export const deleteJobSeeker = (req, res) => {
    const jobSeekerId = req.params.id;

    const sql = `DELETE FROM jobseekers WHERE jobSeeker_id = ?`;
    const values = [jobSeekerId];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            res.status(500).json({
                success: false,
                error: 'Error deleting job seeker'
            });
            return;
        }
        console.log('Job seeker deleted successfully');
        res.json({
            success: true,
            message: 'Job seeker deleted successfully'
        });
    });
};

// Get job seeker by ID
export const getJobSeekerById = (req, res) => {
    const jobSeekerId = req.params.id;

    const sql = `SELECT * FROM jobseekers WHERE jobSeeker_id = ?`;
    const values = [jobSeekerId];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            res.status(500).json({
                success: false,
                error: 'Error fetching job seeker'
            });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Job seeker not found' });
            return;
        }
        const jobSeeker = result[0];
        res.json({
            success: true,
            data: jobSeeker,
            msg: "Fetch job seeker data successfully."
        });
    });
};
export const getJobSeekerByUserId = (req, res) => {
    const user_id = req.params.id;

    const sql = `SELECT * FROM jobseekers WHERE user_id = ?`;
    const values = [user_id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            res.status(500).json({
                success: false,
                error: 'Error fetching job seeker'
            });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Job seeker not found' });
            return;
        }
        const jobSeeker = result[0];
        res.status(200).json({
            success: true,
            data: jobSeeker,
            msg: "Fetch job seeker data successfully."
        });
    });
};

// Get all job seekers
export const getAllJobSeekers = (req, res) => {
    const sql = `SELECT * FROM jobseekers`;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            res.status(500).json({
                success: false,
                error: 'Error fetching job seekers'
            });
            return;
        }
        res.json({
            success: true,
            data: result,
            msg: "Fetch  job seekers data successfully."
        });
    });
};
