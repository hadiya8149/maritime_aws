import { validationResult, body, param } from "express-validator";
import bcrypt from 'bcryptjs';
import { db } from "../config/dbConnection.js";
// import { authenticateJwt } from "../middleware/authMiddleware.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

// CREATE USER

export const createUser = async (req, res) => {
    const { username, email, password, role, age, gender } = req.body;
    console.log(username, email, password, role, age, gender)
    try {
        // Check if email already exists
        const emailExists = await checkEmailExists(email);
        if (emailExists) {
            return res.status(409).send({ success: false, msg: 'This email is already in use!' });
        }

        // Start a database transaction
        await db.beginTransaction();

        // Insert user data into the users table
        const userInsertQuery = 'INSERT INTO users (username, email, password, role, user_age, user_gender) VALUES (?, ?, ?, ?, ?, ?)';
        const userInsertParams = [username, email, password, role, age, gender];
        const insertUser = (userInsertQuery, userInsertParams) => {
            return new Promise((resolve, reject) => {
                db.query(userInsertQuery, userInsertParams, (err, result) => {
                    if (err) {
                        console.error("Error in inserting user", err);
                        reject(err);
                    } else {
                        console.log("Result of inserting user", result);
                        resolve(result);
                    }
                });
            });
        };
        
        // Usage:
        try {
            const result = await insertUser(userInsertQuery, userInsertParams);
            console.log("inserted result data", result)
            const userId = result.insertId
            switch (role.toLowerCase()) {
                case 'admin':
                    await insertAdmin(userId, username, password, email);
                    break;
                case 'student':
                    console.log("inserting studetn")
                    await insertStudent(userId, username, password, email);
                    break;
                case 'employer':
                    console.log('inserting employer')
                    await insertEmployer(userId, username, password, email);
                    break;
                case 'job seeker':
                    await insertJobseeker(userId, username, password, email);
                    break;
                default:
                    // Handle unsupported role
                    await db.rollback(); // Rollback the transaction
                    return res.status(400).send({ success: false, msg: 'Unsupported role' });
            }
    
            // Commit the transaction
            await db.commit();
    
            // Use 'result' here
        } catch (error) {
            // Handle error
            console.error("Error:", error);
        }
        // Insert username and password into the respective role-specific table
        
        // Return success response
        return res.status(201).send({
            success: true,
            msg: 'User and entity created successfully',
            user: {username, email, role }
        });
    } catch (error) {
        // Rollback the transaction if an error occurs
        await db.rollback();

        console.error('Error inserting data:', error);
        return res.status(500).send({ success: false, msg: 'Internal Server Error' });
    }
};

// Function to insert admin data into the admins table THERE CAN;T BE MULTIOPLE ADMINS
const insertAdmin = async (username,email, password) => {
    const adminInsertQuery = 'INSERT INTO admins (user_id,username,email, password, email) VALUES (?, ?,?)';
    await db.query(adminInsertQuery, [userId, username, password, email]);
};

// Function to insert student data into the students table
const insertStudent = async (userId, fullName, gender) => {
    const studentInsertQuery = 'INSERT INTO students (user_id, studentName, gender) VALUES (?, ?, ?)';
    await db.query(studentInsertQuery, [userId, fullName, gender]);
};

// Function to insert employer data into the employers table
const insertEmployer = async (userId, username, email) => {
    const employerInsertQuery = 'INSERT INTO employers (user_id, username, email) VALUES (?, ?, ?)';
    console.log("userid, username, email")
    console.log(userId, username, email);
    await db.query(employerInsertQuery, [userId, username, email], (err, result)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(result)
        }
    });
};

// Function to insert jobseeker data into the jobseekers table
const insertJobseeker = async (userId, email) => {
    const jobseekerInsertQuery = 'INSERT INTO jobseekers (user_id, username, email) VALUES (?, ?)';
    await db.query(jobseekerInsertQuery, [userId, email]);
};


const checkEmailExists = async (email) => {

    try {
        // console.log("........................")

        const rows = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        // console.log("........................")
        return rows.length > 0;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};




// GET USER BY ID

export const getUserById = async (req, res) => {
    const userId = req.params.id
    const sql = 'SELECT username, email, user_age, user_gender FROM users WHERE user_id=?'
    db.query(sql,  [userId], (error, result)=> {
        if (error) throw error;
        else{

            return res.status(200).send({
                success: true,
                data: result[0],
                msg: "Fetch successfully"
            })
        }
    });

};


// GET ALL USERS


export const getAllUsers = async (req, res) => {
    try {
        db.query('SELECT * FROM users;', function (error, result, fields) {
            if (error) throw error;
            return res.status(200).send({
                success: true,
                data: result,
                msg: "Fetch All users successfully"
            })
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            msg: 'Internal Server Error'
        });
    }
};




// UPDATE USER
export const updateUser = async (req, res) => {
    console.log(req.body)

    const { username, email, password, role, user_age, user_gender } = req.body;
    const userId = req.params.id;

    try {
        if (username){
            const user_query = 'UPDATE users SET username=? where user_id=?'
            const values = [username, userId];
            db.query(user_query, values, (err, result)=>{
                if(!err){
                    console.log(result)
                }
                
                else{
                    res.status(400)
                }
            })
        }
        if(password){
            const pass_query = 'UPDATE users SET password=? where user_id=?'
            const values = [pass_query, userId];
            db.query(pass_query, values, (err, result)=>{
                if(!err){
                    console.log(result)
                }
                
                else{
                    res.status(400)
                }
            })
        }
        if(!!user_age){
            const age_query = 'UPDATE users SET user_age=? where user_id=?'
            const values = [user_age, userId];
            db.query(age_query, values, (err, result)=>{
                if(!err){
                    console.log(result)
                }
                
                else{
                    throw err;
                    res.status(400)
                }
            })
        }
        if(user_gender){
            const gender_query = 'UPDATE users SET user_gender=? where user_id=?'
            const values = [user_gender, userId];
            db.query(gender_query, values, (err, result)=>{
                if(!err){
                    console.log(result)
                }
                else{
                    res.status(400)
                }
            })
        }

        // Update the user profile in the corresponding role table
        switch (role.toLowerCase()) {
            case 'admin':
                await updateAdmin(userId, username, password, email);
                break;
            case 'student':
                await updateStudent(userId, username, password, email);
                break;
            case 'employer':
                await updateEmployer(userId, username, password, email);
                break;
            case 'job seeker':
                await updateJobseeker(userId, username, password, email);
                break;
            default:
                break;
        }

        // Commit the transaction
        await db.commit();

        return res.status(200).send({
            success: true,
            msg: "User profile updated successfully!"
        });
    } catch (error) {
        // Rollback the transaction if an error occurs
        await db.rollback();

        return res.status(500).send({
            msg: "Internal Server Error"
        });
    }
};

// Function to update user profile in the admin table
const updateAdmin = async (userId, username, password, email) => {
    const updateAdminQuery = `
        UPDATE admins
        SET username = ?, password = ? , email= ?
        WHERE user_id = ?;
    `;
    await db.query(updateAdminQuery, [username, password, email, userId]);
};

// Function to update user profile in the student table
const updateStudent = async (userId, username, password, email) => {
    const updateStudentQuery = `
        UPDATE students
        SET username = ?, password = ? , email= ?
        WHERE user_id = ?;
    `;
    await db.query(updateStudentQuery, [username, password, email, userId]);
};

// Function to update user profile in the employer table
const updateEmployer = async (userId, username, password, email) => {
    const updateEmployerQuery = `
        UPDATE employers
        SET username = ?, password = ? , email= ?
        WHERE user_id = ?;
    `;
    await db.query(updateEmployerQuery, [username, password, email, userId]);
};

// Function to update user profile in the jobseeker table
const updateJobseeker = async (userId, username, password, email) => {
    const updateJobseekerQuery = `
        UPDATE jobseekers
        SET username = ?, password = ? , email= ?
        WHERE user_id = ?;
    `;
    await db.query(updateJobseekerQuery, [username, password, email, userId]);
};

// DELETE USER
export const deleteUser = async (req, res) => {
    const userId = req.params.userId;
    console.log(userId)
    try {
        // Check if the user exists
        const userResult = await db.query('SELECT * FROM users WHERE user_id = ?;', [userId]);

        if (!userResult || userResult.length === 0) {
            return res.status(404).send({
                msg: 'User not found!'
            });
        }

        // Start a database transaction
        await db.beginTransaction();

        // Delete the user from the users table
        const deleteUserQuery = 'DELETE FROM users WHERE user_id = ?;';
        await db.query(deleteUserQuery, [userId]);

        // Delete user records from role tables
        const deleteRoleQueries = [
            'DELETE FROM admins WHERE user_id = ?;',
            'DELETE FROM students WHERE user_id = ?;',
            'DELETE FROM employers WHERE user_id = ?;',
            'DELETE FROM jobseekers WHERE user_id = ?;'
            // Add more role tables as needed
        ];

        // Execute delete queries for each role table
        for (const deleteQuery of deleteRoleQueries) {
            await db.query(deleteQuery, [userId]);
        }

        // Commit the transaction
        await db.commit();

        return res.status(200).send({
            success: true,
            msg: "User deleted successfully!"
        });
    } catch (error) {
        // Rollback the transaction if an error occurs
        await db.rollback();

        return res.status(500).send({
            msg: "Internal Server Error"
        });
    }
};






// LOGIN USER

// export const loginUser = async (req, res) => {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//         const email = req.body.email;

//         const userResult = await db.query('SELECT * FROM users WHERE LOWER(email) = LOWER(?);', [email]);

//         // console.log('userResult:', userResult);

//         if (!userResult || userResult.length === 0) {
//             console.log('User Result is empty or undefined.');
//             return res.status(401).send({
//                 msg: 'User not found!',
//             });
//         }

//         const user = userResult[0];

//         if (!user || typeof user.password !== 'string') {
//             console.log('Invalid user data:', user);
//             return res.status(401).send({
//                 msg: 'Invalid user data!',
//             });
//         }

//         const hashedPassword = user.password;

//         // Await the bcrypt.compare function
//         const isMatch = await bcrypt.compare(req.body.password, hashedPassword);

//         if (isMatch) {
//             // Passwords match
//             const token = jwt.sign({ userId: user.user_id }, 'your-secret-key', { expiresIn: '1h' });
//             return res.status(200).send({
//                 token,
//                 msg: 'Login successful!',
//             });
//         } else {
//             // Passwords do not match
//             return res.status(401).send({
//                 msg: 'Invalid password!',
//             });
//         }
//     } catch (error) {
//         console.error('Error in loginUser:', error);
//         return res.status(500).send({
//             msg: 'Internal Server Error',
//         });
//     }
// };




//LOGOUT

export const logout = async (res, req) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.clearCookie('sessionID'); // Clear session cookie
        res.status(200).json({ message: 'Logout successful' });
    });
};