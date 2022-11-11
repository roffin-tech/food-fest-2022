import {
    insertBooking,
    getBookedTables,
    insertOrderData,
    getOrders,
    getOrdersById,
    insertOrderDetailsData,
    getProducts,
    getProductsById,
    insertProductData,
    getProductsByNameAndMeasureData
} from "../models/BookTableModel.js";
import {verifyToken} from "../config/jwt.js";

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

// create order
export const createOrder=async (req,res)=>{
    const data = req.body;
    if (data && data.order_items && data.order_items.length > 0) {
        const orderDetailIds = []
        let ctr = 0
        await data.order_items.forEach((item) => {

             insertOrderDetailsData(item,async (err,results)=> {
                if (err) {
                    res.status(400).send({message: 'Product saving failed. Please try again.'});
                }else {
                    console.log('order details results', data.order_items, results)
                    if (results && results.insertId)
                        orderDetailIds.push(results.insertId)
                }
                 ctr++;
                 if (ctr === data.order_items.length) {
                     console.log('order ids',data.order_items, orderDetailIds)
                     const order_items = JSON.parse(JSON.stringify(orderDetailIds))
                     data.order_items = order_items.join(',')

                     const token = req.headers.authorization.substring(7);
                     console.log('token', token)
                     const added_by = await verifyToken(token)
                     data.added_by = added_by && added_by.userId? added_by.userId: 0
                     console.log('data', data)
                     insertOrderData(data,(err,results)=> {
                         if (err) {
                             res.send(err);
                         }else {
                             res.json(results);
                         }
                     });
                 }
            });
        })

    }
};

// fetch Booked tables
export const getOrderData=(req,res)=>{
    console.log(req)
    getOrders(req.params,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// fetch Booked tables
export const getOrderByIdData=(req,res)=>{
    console.log(req)
    getOrdersById(req.params,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// create order
export const createProduct= (req,res)=>{
    const data = req.body;
    getProductsByNameAndMeasureData(data, (err, response) => {
        console.log('getProductsByNameAndMeasureData', response)
        if (err) {
            insertProductData(req.body,(err,results)=> {
                if (err) {
                    res.send(err);
                }else {
                    res.json({
                        message: 'success'
                    });
                }
            });
        } else {
            if (response&& response.length > 0) {
                res.status(400).send({
                    message: 'Product Already Exist. Please add product with another name or quantity.',
                    code: 4100
                })
            } else {
                insertProductData(req.body,(err,results)=> {
                    if (err) {
                        res.send(err);
                    }else {
                        res.json({
                            message: 'success'
                        });
                    }
                });
            }

        }
    })


};

// fetch Booked tables
export const getProductsData=(req,res)=>{
    console.log(req)
    getProducts((err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// fetch Booked tables
export const getProductByIdData=(req,res)=>{
    console.log(req)
    getProductsById(req.params,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};