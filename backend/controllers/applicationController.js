import { db } from '../config/dbConnection.js';

// Create application
export const createApplication = (req, res) => {
    const { std_id } = req.params;
    const { course_id, program_id } = req.params;
    const Status = 'Pending';
    const { app_id, AppDate } = req.body;

    const sql = `
        INSERT INTO applications (app_id, std_id, course_id, program_id, AppDate, Status) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [app_id, std_id, course_id || null, program_id || null, AppDate, Status];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            res.status(500).json({ error: 'Error inserting data' });
            return;
        }
        console.log('Data inserted successfully');
        res.status(201).json({
            success: true,
            message: 'Application created successfully'
        });
    });
};


// Update application
export const updateApplication = (req, res) => {
    const { id, std_id } = req.params;
    const { course_id, program_id } = req.body; // Retrieve from req.body instead of req.params
    const { AppDate, Status } = req.body;

    const sql = `
        UPDATE applications 
        SET std_id = ?, course_id = ?, program_id = ?, AppDate = ?, Status = ? 
        WHERE app_id = ?
    `;
    const values = [std_id, course_id || null, program_id || null, AppDate, Status, id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            res.status(500).json({ error: 'Error updating application' });
            return;
        }
        console.log('Application updated successfully');
        res.json({ 
            success: true,
            message: 'Application updated successfully'
        });
    });
};



// Delete application by ID
export const deleteApplication = (req, res) => {
    const appId = req.params.id;

    const sql = `DELETE FROM applications WHERE app_id = ?`;
    const values = [appId];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            res.status(500).json({ error: 'Error deleting application' });
            return;
        }
        console.log('Application deleted successfully');
        res.json({ 
            success : true,
            message: 'Application deleted successfully' });
    });
};

// Get application by ID
export const getApplicationById = (req, res) => {
    const appId = req.params.id;

    const sql = `SELECT * FROM applications WHERE app_id = ?`;
    const values = [appId];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            res.status(500).json({ error: 'Error fetching application' });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Application not found' });
            return;
        }
        const application = result[0];
        res.json({
            success : true,
            data : application,
            msg: "Fetch application data successfully."
        });
    });
};

// Get all applications
export const getAllApplications = (req, res) => {
    const sql = `SELECT * FROM applications`;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            res.status(500).json({ error: 'Error fetching applications' });
            return;
        }
        res.json({
            success : true,
            data : result,
            msg: "Fetch All applications data successfully."
        });
    });
};
