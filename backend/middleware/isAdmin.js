
export const isAdmin = async (req, res, next) => {
    try {
                // console.log(req.body)

                if (req.body && req.body.role === 'Admin') {
                    // Allow access to admin functionalities
                    return res.status(200).json({ message: 'Admin login successful', isAdmin: true });
                } else {
                    // For regular users or users without admin role
                    return res.status(200).json({ message: 'User login successful', isAdmin: false });
                }
                
                next();

            } catch (error) {
                return res.status(500).json({ error: 'Internal server error' });
            }
}


