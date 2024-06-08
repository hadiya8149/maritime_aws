// controllers/programController.js

import { db } from '../config/dbConnection.js';

// Create a new program
export const createProgram = async (req, res) => {
  const { program_name, description, duration_months, trainer } = req.body.body;
  console.log(program_name, description, duration_months, trainer)

  // Check if all required fields are present

  const query = `
    INSERT INTO trainingprograms (program_name, description, duration_months, trainer, img_url) 
    VALUES (?, ?, ?, ?, ?)
  `;

  const values = [program_name, description, duration_months, trainer, ' '];

  db.query(query, values, (error, result) => {
    if (error) {
      console.log(error)
    }
    console.log(result)
    res.status(201).json({
      success: true,
      message: 'Training Program created successfully'
    });
  });
};

// Get program by ID
export const getProgramById = (req, res) => {
  const programId = req.params.id;

  const query = `SELECT * FROM trainingprograms WHERE program_id = ?`;

  db.query(query, [programId], (error, results) => {
    if (error) {
      res.status(500).json({
        success: false,
        error: 'Internal Server Error'
      });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({
        success: false,
        error: 'Program not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: results,
      msg: 'Fetch successfully'
    });
  });
};

// Get all programs
export const getAllPrograms = (req, res) => {
  const query = `SELECT * FROM trainingprograms`;

  db.query(query, (error, results) => {
    if (error) {
      res.status(500).json({
        success: false,
        error: 'Internal Server Error'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: results,
      msg: "Fetch All training programs successfully."

    });
  });
};

// Update program by ID
export const updateProgram =async (req, res) => {

  const programId = req.params.id;
  console.log(req.params)
  const { program_name, description, duration, trainer } = req.body;
  console.log("req.body", req.body, programId)

  const images = req.files; // Retrieve the array of uploaded files
  function updateTable(col, value){
    const sql = `UPDATE trainingprograms SET ${col} = ? where program_id = ?;`
    db.query(sql, [value, programId], (err, result)=>{
      if(err){
       return res.status(400).json("could not update")
      }
      console.log(result)
    })
  }
  
  if(program_name){
    updateTable('program_name', program_name)
  }
  if(description){
    updateTable('description', description)
  }
  if(duration){
    updateTable('duration_months', duration)
  }

  if(trainer){
    updateTable('trainer', trainer)

  }
  res.status(200).json("program updated successfully")
};

// Delete program by ID
export const deleteProgram = (req, res) => {
  const programId = req.params.id;

  const query = `DELETE FROM trainingprograms WHERE program_id = ?`;

  db.query(query, [programId], (error, results) => {
    if (error) {
      res.status(500).json({
        success: false,
        error: 'Internal Server Error'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Training Program deleted successfully'
    });
  });
};
