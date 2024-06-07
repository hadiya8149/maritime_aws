import { db } from '../config/dbConnection.js';

// Create student
export const createStudent = (req, res) => {
    const { std_id, user_id, studentIDNumber, first_name, last_name, email, contact_no, gender, address } = req.body;

    const sql = `INSERT INTO students (std_id, user_id, studentIDNumber, first_name, last_name, email, contact_no, gender, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [std_id, user_id, studentIDNumber, first_name, last_name, email, contact_no, gender, address];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            res.status(500).json({ error: 'Error inserting data' });
            return;
        }
        console.log('Data inserted successfully');
        res.status(201).json({
            success: true,
            data: result,
            message: 'Student created successfully'
        });
    });
};

// Update student by ID
export const updateStudent = async (req, res) => {
    const {editProfile}=req.body
    const std_id =req.params.id
    if (editProfile.studentName){
        db.query('UPDATE students SET studentName=? WHERE std_id=?', [editProfile.studentName, std_id], (err, result)=>{
            console.log(result)
        })
    }
    if (editProfile.first_name){
        db.query('UPDATE students SET first_name=? WHERE std_id=?', [editProfile.first_name, std_id], (err, result)=>{
            console.log(result)
        })
    }
    if (editProfile.last_name){
        db.query('UPDATE students SET last_name=? WHERE std_id=?', [editProfile.last_name, std_id], (err, result)=>{
            console.log(result)
        })
    }
    if (editProfile.address){
        db.query('UPDATE students SET address=? WHERE std_id=?', [editProfile.address, std_id], (err, result)=>{
            console.log(result)
        })
    }
    if (editProfile.contact_no){
        db.query('UPDATE students SET contact_no=? WHERE std_id=?', [editProfile.contact_no, std_id], (err, result)=>{
            console.log(result)
        })
    }
}




// Delete student by ID
export const deleteStudent = (req, res) => {
    const studentId = req.params.id;

    const sql = `DELETE FROM students WHERE std_id = ?`;
    const values = [studentId];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            res.status(500).json({ error: 'Error deleting student' });
            return;
        }
        console.log();
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
    const sql = `SELECT * FROM students WHERE std_id = ?`;
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
        const student = result[0];
        res.status(200).json({
            success: true,
            data: student,
            msg: "Fetch student data successfully."
        });
    });
};
export const getStudentByUserId = (req, res) => {
    const Id = req.params.id;

    const sql = `SELECT * FROM students WHERE user_id = ?`;

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
        const student = result[0];
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
            data: result,
            msg: "Fetch All students data successfully."
        });
    });
};
