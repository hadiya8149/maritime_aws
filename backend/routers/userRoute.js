import express from 'express';
import { createUser, getUserById, getAllUsers, updateUser, deleteUser, logout } from '../controllers/userController.js';
import { check } from 'express-validator';
import { authenticateJwt } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/isAdmin.js';
import { db } from "../config/dbConnection.js";

const userRouter = express.Router();

userRouter.post('/create_user' , createUser);

userRouter.post('/login', async (req, res)=>{
    const email = req.body.email;

    const pass = req.body.password;
    console.log(email, pass)
    const sql = 'SELECT * FROM users WHERE email= ?';
    await db.query(sql, [email], (err, result)=>{
        console.log(result)
        if (err) {

            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        if (result.length < 1) {
            return res.status(404).json({ message: 'User not found' });
        }
        else{
            // check for password
            if (pass === result[0].password){
                console.log(result[0].role)
                console.log(result[0])
                return res.status(200).json(({user_role:result[0].role,user_id:result[0].user_id, token:'test123', username:result[0].username}))
            }
            else{
                return res.status(401).json({ message: 'invalid password' });
            }
        }
    })
})



// Assume this is your login route handler
// userRouter.post('/login' ,isAdmin , loginUser);



// GET /api/user/:userId
userRouter.get('/user/:id', getUserById);

// GET /api/users
userRouter.get('/users',  getAllUsers);

// PUT /api/user/:userId
userRouter.put('/update_user/:id',  updateUser);

// DELETE /api/user/:userId
// userRouter.delete('/delete_user/:userId', authenticateJwt,  deleteUser);
userRouter.delete('/delete_user/:userId',  deleteUser);


userRouter.post('/logout' ,logout);

export default userRouter;
