// const Database = require('better-sqlite3');


// let db;

// try {
//   db = new Database('database.db'); // Opens or creates DB file synchronously
//   console.log('DB connected successfully');
// } catch (err) {
//   console.error('DB connection error:', err.message);
//   // Handle error, exit process or retry as needed
// }


// // Create customers table
// db.exec(`
//   CREATE TABLE IF NOT EXISTS customers (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     first_name TEXT NOT NULL,
//     last_name TEXT NOT NULL,
//     phone_number TEXT NOT NULL,
//     email TEXT UNIQUE
//   )
// `);

// // Create addresses table
// db.exec(`
//   CREATE TABLE IF NOT EXISTS addresses (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     customer_id INTEGER NOT NULL,
//     address_details TEXT NOT NULL,
//     city TEXT NOT NULL,
//     state TEXT NOT NULL,
//     pin_code TEXT NOT NULL,
//     is_active INTEGER NOT NULL DEFAULT 0,
//     created_at TEXT DEFAULT CURRENT_TIMESTAMP,
//     updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY(customer_id) REFERENCES customers(id)
//   )
// `);


// module.exports = db



const Database = require("better-sqlite3");
const path = require("path");
const dbPath = path.join(__dirname, "database.db");

// Open DB (synchronous)
let db;
try {
    db = new Database(dbPath);
    console.log("DB Connected Successfully!");
} catch (err) {
    console.log(`DB Connection Error: ${err.message}`);
}

const createCustomerTable = `
  CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    email TEXT UNIQUE
  )`;
const createAddressTable = `
  CREATE TABLE IF NOT EXISTS addresses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER NOT NULL,
    address_details TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    pin_code TEXT NOT NULL,
    is_active INTEGER NOT NULL DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(customer_id) REFERENCES customers(id)
  )`;

try {
    db.exec(createCustomerTable);
    console.log("Customer table created");
} catch (err) {
    console.log(`Table Creation Error: ${err.message}`);
}

  
try {
    db.exec(createAddressTable);
    console.log("Address table created");
} catch (err) {
    console.log(`Table Creation Error: ${err.message}`);
}

module.exports = db;