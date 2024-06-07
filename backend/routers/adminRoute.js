import express from 'express';
import { createAdmin, deleteAdmin, getAdminById, getAllAdmins, updateAdmin } from '../controllers/adminController.js';

const adminRouter = express.Router();

//Create admin
adminRouter.post('/create_admin', createAdmin);

// Update admin
adminRouter.put('/update_admin/:id', updateAdmin);

// Delete admin
adminRouter.delete('/delete_admin/:id', deleteAdmin);

// Get admin by ID
adminRouter.get('/admin/:id', getAdminById);

// Get all admins
adminRouter.get('/admins', getAllAdmins);

export default adminRouter;
