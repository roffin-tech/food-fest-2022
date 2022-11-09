import mysql from "mysql2";

// create the connection to database

const db = mysql.createConnection({
    host: process.env.DB_HOST || "52.66.140.212",
    user:  process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "TstHelp@123",
    database: process.env.DB_DATABASE || "food_fest_test"
});


db.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

export default db;