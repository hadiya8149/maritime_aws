import { Router } from 'express';
import {db} from '../config/dbConnection.js';


const courseApplicationRouter = Router();

//craete course
courseApplicationRouter.post('/apply_for_course', (req,res)=>{
    const {std_id, course_id, program_id, AppDate, Status}=req.body.body
    console.log(req.body.body)
    const sql = `INSERT INTO applications_for_courses_and_programs (std_id, course_id, program_id, AppDate, Status) VALUES(?, ?, ?, ?, ?)`;
    const values = [std_id, course_id, program_id, AppDate, Status]
    db.query(sql,values, (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            res.status(500).json({ error: 'Error inserting data in applicaitons courses and programs' });
            return;
        }
        else{
            res.status(201).json({
                success : true,
                msg: "Program enrolled successfully"
            });    
        }
        console.log(result)
        
    });
});

// Get all courses
courseApplicationRouter.get('/all_course_applications', (req, res)=>{
    const sql = `SELECT * FROM applications_for_courses_and_programs WHERE course_id`;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            res.status(500).json({ error: 'Error fetching students' });
            return;
        }
        res.json({
            success : true,
            data : result,
            msg: "Fetch All students data successfully."
        });
    });
});

// Get course by student ID
courseApplicationRouter.get('/course_application_by_std/:id', (req, res)=>{
    const id = req.params.id;
    console.log(id)
    const sql = 'select courses.course_id, courses.course_name from applications_for_courses_and_programs inner join courses on applications_for_courses_and_programs.course_id=courses.course_id where std_id=?;'
    db.query(sql,[id] ,(err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            res.status(500).json({ error: 'Error fetching students' });
            return;
        }
        if (result.length>0){
            res.status(200).json({
                success : true,
                data : result,
                msg: "Fetch All students data successfully."
            });
        }
        else{
            res.status(404).json({data:"no courses found"})
        }
        
    });

});


// Update course application by ID
courseApplicationRouter.put('/course_application/:id', (req, res)=>{

});

// Delete course application by ID
courseApplicationRouter.delete('/course_application/:id', (req, res)=>{

});

export default courseApplicationRouter;
