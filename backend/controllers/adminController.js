import { db } from "../config/dbConnection.js";

export const createAdmin = (req, res) => {
    const { admin_id, user_id, first_name, last_name, contact_number, email, role_description } = req.body;

    const sql = `INSERT INTO admins (admin_id, user_id, first_name, last_name, contact_number, email, role_description) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [admin_id, user_id, first_name, last_name, contact_number, email, role_description];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            res.status(500).json({
                success: false,
                error: 'Error inserting data'
            });
            return;
        }
        console.log('Data inserted successfully');
        res.status(201).json({
            success: true,
            data: result,
            message: 'Data inserted successfully'
        });
    });
};

// Update admin by ID
export const updateAdmin = (req, res) => {
    const adminId = req.params.id;
    const { user_id, username, password, first_name, last_name, contact_number, email, role_description } = req.body;

    // Update admin table
    const adminUpdateSql = `UPDATE admins SET user_id = ?, username = ?, password = ?, first_name = ?, last_name = ?, contact_number = ?, email = ?, role_description = ? WHERE admin_id = ?`;
    const adminUpdateValues = [user_id, username, password, first_name, last_name, contact_number, email, role_description, adminId];

    // Update user table
    const userUpdateSql = `UPDATE users SET username = ?, password = ?,  email = ? WHERE user_id = ?`;
    const userUpdateValues = [username, password, email, user_id];

    db.beginTransaction((err) => {
        if (err) {
            console.error('Error beginning transaction:', err);
            return res.status(500).json({
                success: false,
                error: 'Error updating admin'
            });
        }

        // Update admin table
        db.query(adminUpdateSql, adminUpdateValues, (adminErr) => {
            if (adminErr) {
                db.rollback(() => {
                    console.error('Error updating admin:', adminErr);
                    res.status(500).json({
                        success: false,
                        error: 'Error updating admin'
                    });
                });
                return;
            }

            // Update user table
            db.query(userUpdateSql, userUpdateValues, (userErr) => {
                if (userErr) {
                    db.rollback(() => {
                        console.error('Error updating user:', userErr);
                        res.status(500).json({
                            success: false,
                            error: 'Error updating user'
                        });
                    });
                    return;
                }

                // Commit transaction if both updates are successful
                db.commit((commitErr) => {
                    if (commitErr) {
                        db.rollback(() => {
                            console.error('Error committing transaction:', commitErr);
                            res.status(500).json({
                                success: false,
                                error: 'Error updating admin'
                            });
                        });
                        return;
                    }

                    console.log('Admin updated successfully');
                    res.json({
                        success: true,
                        message: 'Admin updated successfully'
                    });
                });
            });
        });
    });
};


// Delete admin by ID
export const deleteAdmin = (req, res) => {
    const adminId = req.params.id;

    const sql = `DELETE FROM admins WHERE admin_id = ?`;
    const values = [adminId];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            res.status(500).json({
                success: false,
                error: 'Error deleting admin'
            });
            return;
        }
        console.log('Admin deleted successfully');
        res.json({
            success: true,
            message: 'Admin deleted successfully'
        });
    });
};

// Get admin by ID
export const getAdminById = (req, res) => {
    const adminId = req.params.id;

    const sql = `SELECT * FROM admins WHERE admin_id = ?`;
    const values = [adminId];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            res.status(500).json({
                success: false,
                error: 'Error fetching admin'
            });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Admin not found' });
            return;
        }
        const admin = result[0];
        res.json({
            success: true,
            data: admin,
            msg: "Fetch admin data successfully."
        });
    });
};

// Get all admins
export const getAllAdmins = (req, res) => {
    const sql = `SELECT * FROM admins`;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            res.status(500).json({
                success: false,
                error: 'Error fetching admins'
            });
            return;
        }
        console.log('res')
        console.log(res)
        res.json({
            success: true,
            data: result,
            msg: "Fetch All admins data successfully."
        });
    });
};