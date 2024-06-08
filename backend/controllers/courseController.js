import { db } from '../config/dbConnection.js';

// CREATE COURSE 

export const createCourse  = async (req, res) => {
  const { course_name, description, duration_months, instructor } = req.body.body;
  console.log(course_name, description, duration_months, instructor)
  const images = req.files; // Retrieve the array of uploaded files
  const query = `
    INSERT INTO courses (course_name, description, duration_months, instructor, image_url) 
    VALUES (?, ?, ?, ?, ?)
  `;

  // Create an array of values for the query
  const values = [course_name, description, duration_months, instructor, '']; // Join URLs with a delimiter

  // Execute the query
  await db.query(query, values, (error, results) => {
    console.log(results)
    if (error) {
      console.log(error)
    }
    console.log(results)
    res.status(201).json({
      success: true,
      data: results,
      message: 'Course created successfully'
    });
  });
};



// UPDATE COURSE 

export const updateCourse = (req, res) => {
  const courseId = req.params.id;
  const { course_name, description, duration, instructor } = req.body;
  const images = req.files; // Retrieve the array of uploaded files
  console.log(courseId, req.body, "req.body")
  function updateTable(col, value){
    const sql = `UPDATE courses SET ${col} = ? where course_id=?;`
    db.query(sql, [value, courseId], (err, result)=>{
      if(err){
       return res.status(400).json("could not update")
      }
    })
  }
  
  if(course_name){
    updateTable('course_name', course_name)
  }
  if(description){
    updateTable('description', description)
  }
  if(duration){
    updateTable('duration_months', duration)
  }

  if(instructor){
    updateTable('instructor', instructor)

  }
  res.status(200).json({msg:"program updated successfully"})
};


// DELETE COURSE 

export const deleteCourse = (req, res) => {
  const courseId = req.params.id;

  const query = `DELETE FROM courses WHERE course_id = ?`;

  db.query(query, [courseId], (error, results) => {
    if (error) {
      res.status(500).json({
        success: false,
        error: 'Internal Server Error'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Course deleted successfully'
    });
  });
};



// Get course by ID
export const getCourseById = (req, res) => {
  const courseId = req.params.id;

  const query = `SELECT * FROM courses WHERE course_id = ?`;

  db.query(query, [courseId], (error, results) => {
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
        error: 'Course not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: results
    });
  });
};

// Get all courses
export const getAllCourses = (req, res) => {
  const query = `SELECT * FROM courses`;

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
      data: results
    });
  });
};

