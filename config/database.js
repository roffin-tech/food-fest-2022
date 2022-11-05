import mysql from "mysql2";

// create the connection to database

const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user:  process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "food_fest_test"
});


db.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

export default db;