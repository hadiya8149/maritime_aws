// userModel.js

import { db } from "../config/dbConnection.js";
import bcrypt from 'bcryptjs';

export const createUser = async (userData) => {
    const {
        username,
        email,
        password,
        role,
        user_age,
        user_gender,
        token
    } = userData;

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertUserQuery = `
        INSERT INTO users (username, email, password, role, user_age, user_gender, token)
        VALUES (?, ?, ?, ?, ?, ?, ?);
    `;

    const insertResult = await db.promisifyQuery(insertUserQuery, [
        username,
        email,
        hashedPassword,
        role,
        user_age,
        user_gender,
        token
    ]);

    return insertResult;
};

export const updateUser = async (userId, userData) => {
    const {
        username,
        email,
        password,
        role,
        user_age,
        user_gender,
        token
    } = userData;

    const hashedPassword = await bcrypt.hash(password, 10);

    const updateUserQuery = `
        UPDATE users
        SET username = ?,
            email = ?,
            password = ?,
            role = ?,
            user_age = ?,
            user_gender = ?,
            token = ?
        WHERE user_id = ?;
    `;

    const updateResult = await db.promisifyQuery(updateUserQuery, [
        username,
        email,
        hashedPassword,
        role,
        user_age,
        user_gender,
        token,
        userId
    ]);

    return updateResult;
};

export const deleteUser = async (userId) => {
    const deleteUserQuery = `
        DELETE FROM users WHERE user_id = ?;
    `;

    const deleteResult = await db.promisifyQuery(deleteUserQuery, [userId]);

    return deleteResult;
};

export const getAllUsers = async () => {
    const query = 'SELECT * FROM users;';
    const result = await db.promisifyQuery(query);

    return result;
};

// Add other functions as needed

// You can also add functions to get a user by ID, email, etc.
