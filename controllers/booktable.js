import {
    insertBooking, getBookedTables
} from "../models/BookTableModel.js";

// create Booking
export const createBooking=(req,res)=>{
    const data = req.body;
    insertBooking(data,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// fetch Booked tables
export const fetchBookedTables=(req,res)=>{
    getBookedTables(data,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};