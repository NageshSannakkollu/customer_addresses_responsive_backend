const sqlite3 = require('sqlite3').verbose();
const path = require('path')
let db;

try {
  db = new sqlite3.Database(path.join(__dirname,'database.db')); // Opens or creates DB file synchronously
  console.log('DB connected successfully');
} catch (err) {
  console.error('DB connection error:', err.message);
  // Handle error, exit process or retry as needed
}


// Create customers table
const createCustomerTable = `
  CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone_number TEXT NOT NULL UNIQUE,
    email TEXT 
  )`;

// Create addresses table
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
  )
`;

try {
  db.run(createCustomerTable);
  console.log("Customer table created successfully");
} catch (err) {
  console.log(`Customer Table Creation Error: ${err.message}`);
}

try {
  db.run(createAddressTable);
  console.log("Address table created successfully");
} catch (err) {
  console.log(`Address Table Creation Error: ${err.message}`);
}


module.exports = db