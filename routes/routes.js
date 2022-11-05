// import express 
import express from "express";
// import functions from controller 


import {
    showAUser,
    createAccount,
    allUsers,
    userAuthentication,
    validateToken
} from "../controllers/user.js";

import {verifyToken} from "../config/jwt.js";


import {
    createBooking, fetchBookedTables
} from "../controllers/booktable.js";

import upload from "../config/multer.js";
import { uploadImage } from "../controllers/imageupload.js";



// init express router
const router = express.Router();



router.use(function isAuthorized(req, res, next){
    if (req.originalUrl === '/api/users/login') {
        console.log('orginal url', req.originalUrl)
        next()
    } else {
        next()
        // try{
        //     const data = (req.headers.authorization || '').substring(7);
        //     const response = verifyToken(data)
        //     console.log('response', response)
        //     if (!response.valid)
        //         next(res.status(403).send({message: 'Token Validation Failed. Kill the app and retry.'}))
        //     else
        //         next()
        // }catch (e) {
        //     console.log(e)
        //     // next(res.status(403).send({message: 'Failed'}))
        // }
    }
});

////////////////////////// USER ////////////////////////////////
// get all user
// router.post("/api/users/")

router.get("/api/users/", allUsers);

router.get("/api/users/:email", showAUser);

// create account
router.post("/api/users/", createAccount);

// user authentication
router.post("/api/users/login", userAuthentication);

// token validation
router.post("/api/users/validate-token", validateToken);

// upload an image
router.post('/api/upload', upload.single('image'), uploadImage);

////////////////////////// Booking ////////////////////////////////
router.post("/api/book-tables", createBooking);
router.get("/api/book-tables", fetchBookedTables);



// export default router
export default router;








