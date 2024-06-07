import express from 'express';
import { upload } from '../middleware/upload.js'; // Assuming you have middleware for file uploads
import { createProgram, deleteProgram, getAllPrograms, getProgramById, updateProgram } from '../controllers/trainingController.js';

const trainingRouter = express.Router();

// Create a new program
trainingRouter.post('/program', createProgram);

// Get all programs
trainingRouter.get('/programs', getAllPrograms);

// Get program by ID
trainingRouter.get('/program/:id', getProgramById);

// Update program by ID
trainingRouter.put('/update_program/:id', updateProgram);
 
// Delete program by ID 
trainingRouter.delete('/program/:id', deleteProgram);

export default trainingRouter; 
 