import { db } from '../config/dbConnection.js';

// Create student
export const createStudent = (req, res) => {
    const {user_id, studentIDNumber, first_name, last_name, email, contact_no, gender, address } = req.body;

    const sql = `INSERT INTO students (user_id, studentIDNumber, first_name, last_name, email, contact_no, gender, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
    const values = [user_id, studentIDNumber, first_name, last_name, email, contact_no, gender, address];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            res.status(500).json({ error: 'Error inserting data' });
            return;
        }
        console.log('Data inserted successfully');
        res.status(201).json({
            success: true,
            data: result.rows,
            message: 'Student created successfully'
        });
    });
};

// Update student by ID
export const updateStudent = async (req, res) => {
    const {editProfile}=req.body
    const std_id =req.params.id
    if (editProfile.studentName){
        db.query('UPDATE students SET studentName=$1 WHERE std_id=$2', [editProfile.studentName, std_id], (err, result)=>{
            console.log(result)
        })
    }
    if (editProfile.first_name){
        db.query('UPDATE students SET first_name=$1 WHERE std_id=$2', [editProfile.first_name, std_id], (err, result)=>{
            console.log(result)
        })
    }
    if (editProfile.last_name){
        db.query('UPDATE students SET last_name=$1 WHERE std_id=$2', [editProfile.last_name, std_id], (err, result)=>{
            console.log(result)
        })
    }
    if (editProfile.address){
        db.query('UPDATE students SET address=$1 WHERE std_id=$2', [editProfile.address, std_id], (err, result)=>{
            console.log(result)
        })
    }
    if (editProfile.contact_no){
        db.query('UPDATE students SET contact_no=$1 WHERE std_id=$2', [editProfile.contact_no, std_id], (err, result)=>{
            console.log(result)
        })
    }
}




// Delete student by ID
export const deleteStudent = (req, res) => {
    const studentId = req.params.id;

    const sql = `DELETE FROM students WHERE std_id = $1`;
    const values = [studentId];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            res.status(500).json({ error: 'Error deleting student' });
        }
        res.status(200).json({
            success: true,
            message: 'Student deleted successfully'
        });
    });
};

// Get student by ID
export const getStudentById = (req, res) => {
    const studentId = req.params.id;
    console.log(req.params.id)
    const sql = `SELECT * FROM students WHERE std_id = $`;
    const values = [studentId];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            res.status(500).json({ error: 'Error fetching student' });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Student not found' });
            return;
        }
        res.status(200).json({
            success: true,
            data: result.rows[0],
            msg: "Fetch student data successfully."
        });
    });
};
export const getStudentByUserId = (req, res) => {
    const Id = req.params.id;

    const sql = `SELECT * FROM students WHERE user_id = $1`;

    db.query(sql, [Id], (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            res.status(500).json({ error: 'Error fetching student' });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Student not found' });
            return;
        }
        const student = result.rows;
        res.json({
            success: true,
            data: student,
            msg: "Fetch student data successfully."
        });
    });
};

// Get all students
export const getAllStudents = (req, res) => {
    const sql = `SELECT * FROM students`;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            res.status(500).json({ error: 'Error fetching students' });
            return;
        }
        res.json({
            success: true,
            data: result.rows,
            msg: "Fetch All students data successfully."
        });
    });
};
