// import functions from User model

import { response } from "express";
import {
    getAllUser,
    getUserByEmail,
    insertUser
} from "../models/UserModel.js";
import {createToken, verifyToken} from '../config/jwt.js'

// get all Users
export const allUsers=(req,res)=>{
    getAllUser((err,results)=> {
        if (err) {
            // var errorResponse = [];
            // errorResponse.push(err);
            res.send(err);
        }else {
            res.json(results);
        }
    });
};


// get single user
export const showAUser = (req,res)=>{
    getUserByEmail(req.params.email,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// create user
export const createAccount=(req,res)=>{
    const data = req.body;
    insertUser(data,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// user authentication
export const userAuthentication=async (req,res)=>{
    const data = req.body;
    console.log('model', data)
    getUserByEmail(data,(err,results)=> {
        console.log('login results', results)
        if (err) {
            res.status(400).send({message: "Entered Phone Number is Not Valid"});
        } else if (!results||!(results||{}).id){
            res.status(400).send({message: "Entered Phone Number or Password is Not Valid"});
        } else {
            const token = createToken(results)
           res.json({token});
        }
    });
};

// validate token
export const validateToken=async (req,res)=>{
    try {
        const data = req.headers.authorization.substring(7);
        console.log('data', data)
        const response = await verifyToken(data)
        console.log('data', response)
        res.send(response)
    } catch (err) {
        res.status(403).send({message: 'Token Validation Failed. Kill the app and retry.'})
    }

};






