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

// insert Booking
export const insertOrderData = (data,result) => {
    db.query("INSERT INTO order_info SET ?",data, (err,results)=> {
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

// insert Order Details Data
export const insertOrderDetailsData = (data,result) => {
    db.query("INSERT INTO order_details SET ?",data, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            console.log(results);
            result(null,results);
        }
    });
};


// get Booking
export const getOrdersById = (data,result) => {
    db.query("SELECT * FROM order_info WHERE id = ? AND added_by = ?",[data.id, data.userId], (err,results)=> {
        if (err){
            console.log(err);
            result(err, null);
        }else{
            console.log(results);
            result(null,results);
        }
    });
};


// get All Orders
export const getOrders = (data,result) => {
    db.query("SELECT * FROM order_info WHERE added_by = ?",[data.userId], (err,results)=> {
        if (err){
            console.log(err);
            result(null, []);
        }else{
            console.log(results);
            result(null,results);
        }
    });
};





// get Products By Id
export const getProductsById = (data,result) => {
    db.query("SELECT * FROM product WHERE id = ? AND added_by = ?",[data.id, data.userId], (err,results)=> {
        if (err){
            console.log(err);
            result(err, null);
        }else{
            console.log(results);
            result(null,results);
        }
    });
};
//  getProductsByNameAndMeasure
export const getProductsByNameAndMeasureData = (data,result) => {
    const product_name_unique = data.product_name.split(' ').join('').toLowerCase() + data.available_measure.split(' ').join('').toLowerCase()
    db.query("SELECT * FROM product WHERE product_name_unique = ?",[product_name_unique], (err,results)=> {
        if (err){
            console.log(err);
            result(err, null);
        }else{
            console.log(results);
            result(null,results);
        }
    });
};


// get All Products
export const getProducts = (result) => {
    db.query("SELECT * FROM product",(err,results)=> {
        if (err){
            console.log(err);
            result(null, []);
        }else{
            console.log(results);
            result(null,results);
        }
    });
};



// insert Product Data
export const insertProductData = (data,result) => {
    const product_name_unique = data.product_name.split(' ').join('').toLowerCase() + data.available_measure.split(' ').join('').toLowerCase()
    data.product_name_unique = product_name_unique
    db.query("INSERT INTO product SET ?",data, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            console.log(results);
            result(null,results);
        }
    });
};
