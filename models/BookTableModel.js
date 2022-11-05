// import connection
import db from "../config/database.js";

// insert Booking
export const insertBooking = (data,result) => {
    db.query("INSERT INTO taleconfig SET ?",data, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            console.log(results);
            result(null,{
                message: "success"
            });
        }
    });
};

// get Booking
export const getBookedTables = (data,result) => {
    db.query("SELECT * FROM taleconfig", (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            console.log(results);
            result(null,results);
        }
    });
};