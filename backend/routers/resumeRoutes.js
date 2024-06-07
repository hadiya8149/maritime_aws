import express from 'express';
import {db} from '../config/dbConnection.js';

// import { upload } from '../middleware/upload.js';
// import { uploadResume } from '../controllers/resumeController.js';

import multer from 'multer';
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './public/data/uploads')
    },

    filename: function (req, file, cb){
        cb(null, file.originalname)
    }
}
)
const upload = multer({storage:storage})

const resumeRoute = express.Router();

resumeRoute.post('/upload_resume' , upload.single('file') , async(req, res) => {
    console.log(req.body)
    console.log(req.file)
    const { jobSeeker_id } = req.body;
    console.log(req.body, jobSeeker_id)
  
    // // Insert resume details into MySQL database
    const query = 'select * from resume where jobSeeker_id=?';
    await db.query(query, [jobSeeker_id],async (err, result)=>{
        if(!err){
            console.log("updating resume")
            if(result[0].jobSeeker_id){
                const sql = 'UPDATE resume SET resume_URL=? WHERE jobSeeker_id=?';
                const values = [req.file.originalname, jobSeeker_id];
                await db.query(sql, values, (error, result)=>{
                    if(!err){
                        res.status(200).json({msg:'resume updated successfully'})
                    }
                })
            }
            else{
                const LastUpdatedDate = new Date.now().toISOString().slice(0,19).replace('T', ' ');
                const sql = 'INSERT INTO resume (jobSeeker_id, resume_URL, LastUpdatedDate) VALUES (?, ?, ?)';
                await db.query(sql, [jobSeeker_id, req.file.originalname, LastUpdatedDate], (err, result)=>{
                    if(!err){
                        res.status(200).json({msg:'inserted resume succeessfully'})
                    }
                })
            }
        }
    })
});
resumeRoute.get('/get_resume/:id', async(req, res)=>{
    try{
        const sql = 'select resume_URL from resume where jobSeeker_id=?'
        const jobSeeker_id = req.params.id;
        await db.query(sql, [jobSeeker_id], (err, result)=>{
            console.log(result[0].resume_URL)
            res.send(result[0].resume_URL)
        })
    }
    catch(error){

    }
});
export default resumeRoute;