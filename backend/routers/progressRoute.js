import express from 'express';
import {db} from '../config/dbConnection.js';


const progressRouter = express.Router();

// Create a new progress
progressRouter.post('/progress', async(req, res)=>{
  const {std_id, CourseID, ProgramID, ProgressPercentage, CompletionStatus, LastUpdatedDate} = req.body;
  const sql = 'INSERT INTO progress (std_id, CourseID, ProgramID, ProgressPercentage, CompletionStatus, LastUpdatedDate)VALUES(?,?,?,?,?,?)'
  db.query(sql, [std_id, CourseID, ProgramID, ProgressPercentage, CompletionStatus, LastUpdatedDate], (err, result)=>{
    if(err){
      throw err;
    }
    else{
      console.log(result)
      res.status(200).json("progress created")
    }
  })
});

// Get all progresss
progressRouter.get('/progresss');

// Get progress by ID
progressRouter.get('/progress/:id', async (req,res)=>{
  const std_id = req.params.id;
  const query = `SELECT * FROM progress WHERE std_id = ?`;

  db.query(query, [std_id], (error, results) => {
    if (error) {
      res.status(500).json({
        success: false,
        error: 'Internal Server Error'
      });
    }

    if (results.length === 0) {
      res.status(404).json({
        success: false,
        error: 'No progress found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: results
    });
  });
});


// Update progress by ID
progressRouter.put('/progress/:id');

// Delete progress by ID
progressRouter.delete('/progress/:id');

export default progressRouter;
