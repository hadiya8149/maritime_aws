import {db} from '../config/dbConnection.js';

// Create employer
export const createEmployer = (req, res) => {
    const { user_id, company_name, contact_email, contact_number, company_website, company_size, location, description } = req.body;

    const sql = `INSERT INTO employers (user_id, company_name, contact_email, contact_number, company_website, company_size, location, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
    const values = [user_id, company_name, contact_email, contact_number, company_website, company_size, location, description];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            res.status(500).json({ 
                success: false,
                error: 'Error inserting data' });
            return;
        }
        console.log('Data inserted successfully');
        res.status(201).json({
            success : true,
            message: 'Employer created successfully'
        });
    });
};

// Update employer by ID
export const updateEmployer = (req, res) => {
    const employerId = req.params.id;
    const {  company_name, contact_email, contact_number, company_website, company_size, location, description } = req.body.body;
    console.log(req.body)
    async function updateTable(col, value){
        const sql = `UPDATE employers SET ${col} =$1 WHERE employer_id=$2;`
        db.query(sql, [value,employerId], (err,result)=>{
            if(err){
                throw err
            }
            return result
        })
    }
    if (company_name){
        updateTable('company_name', company_name)
    }
    if(contact_email){
    updateTable('contact_email', contact_email)

    }
    if(location){
    updateTable('location', location)
    }
    if(description){
    updateTable('description', description)
        
    }
    if(company_size){
    updateTable('company_size', company_size)
        
    }
    if(company_website){
        updateTable('company_website', company_website)
    }   
    if(contact_number){
    updateTable('contact_number', contact_number)

    }
    if(email){
        updateTable('email', email)
    
        }
    return res.status(200)
};

// Delete employer by ID
export const deleteEmployer = (req, res) => {
    const employerId = req.params.id;

    const sql = `DELETE FROM employers WHERE employer_id = $1`;
    const values = [employerId];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            res.status(500).json({ 
                success: false,
                error: 'Error deleting employer' });
            return;
        }
        console.log('Employer deleted successfully');
        res.json({ 
            success : true,
            message: 'Employer deleted successfully' });
    });
};

// Get employer by ID
export const getEmployerById = async(req, res) => {
    const employerId = req.params.id;

    const sql = `SELECT * FROM employers WHERE employer_id = $1`;
    const values = [employerId];

    await db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            res.status(500).json({ 
                success: false,
                error: 'Error fetching employer' });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ 
                success: false,
                error: 'Employer not found' });
            return;
        }
        res.json({
            success : true,
            data : result.rows,
            msg: "Fetch employer data successfully."
        });
    });
};
export const getEmployerByUserId = async (req, res) => {
    const user_id = req.params.id;
    console.log(user_id) 
    const sql = `SELECT * FROM employers WHERE user_id = $1`;
    const values = [user_id];

    await db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            res.status(500).json({ 
                success: false,
                error: 'Error fetching employer' });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ 
                success: false,
                error: 'Employer not found' });
            return;
        }
        const employer = result.rows;
        res.status(200).json({
            success : true,
            data : employer,
            msg: "Fetch employer data successfully."
        });
    });
};

// Get all employers
export const getAllEmployers = (req, res) => {
    const sql = `SELECT * FROM employers`;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            res.status(500).json({ 
                success: false,
                error: 'Error fetching employers' });
            return;
        }
        res.json({
            success : true,
            data : result.rows,
            msg: "Fetch All employers data successfully."
        });
    });
};
