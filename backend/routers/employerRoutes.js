import express from 'express';
import { createEmployer, deleteEmployer,getEmployerByUserId, getEmployerById, getAllEmployers, updateEmployer } from '../controllers/employerController.js';

const employerRouter = express.Router();

// Create employer
employerRouter.post('/create_employer', createEmployer);

// Update employer
employerRouter.put('/update_employer/:id', updateEmployer);

// Delete employer
employerRouter.delete('/delete_employer/:id', deleteEmployer);

// Get employer by ID
employerRouter.get('/employer/:id', getEmployerById);
employerRouter.get('/employer_by_user_id/:id', getEmployerByUserId);
// Get all employers
employerRouter.get('/employers', getAllEmployers);



export default employerRouter;
