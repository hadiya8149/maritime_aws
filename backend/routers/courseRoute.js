import { Router } from 'express';
import { createCourse, deleteCourse, getAllCourses, getCourseById, updateCourse } from '../controllers/courseController.js';
import {upload} from '../middleware/upload.js';

const courseRouter = Router();

//craete course
courseRouter.post('/course', createCourse);
// Get all courses
courseRouter.get('/courses', getAllCourses);

// Get course by ID
courseRouter.get('/course/:id', getCourseById);

// Update course by ID
courseRouter.put('/course/:id',upload, updateCourse);

// Delete course by ID
courseRouter.delete('/course/:id', deleteCourse);

export default courseRouter;
