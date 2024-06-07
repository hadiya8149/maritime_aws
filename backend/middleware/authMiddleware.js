
export const authenticateJwt = async (req, res, next) => {

    try {

        if (
            !req.headers.authentication ||
            !req.headers.authentication.startsWith('Bearer') ||
            !req.headers.authentication.split(' ')[1]

        ) {
            return res.status(200).json({
                message: "Please provide token"
            })
        }
        // else {
        //     let token = req.headers.authentication.split(' ')[1];
        //     console.log('Token is : ', token)
        // }

        next();
    }
    catch (error) {
        console.log(error.meesage)
    }
};




