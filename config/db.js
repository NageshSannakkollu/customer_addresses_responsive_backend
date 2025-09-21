const Database = require('better-sqlite3');
const path = require('path');
const dbPath = path.join(__dirname, 'database.db');

let db;

try {
  db = new Database(dbPath); // Opens or creates DB file synchronously
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
  db.exec(createCustomerTable);
  console.log("Customer table created successfully");
} catch (err) {
  console.log(`Customer Table Creation Error: ${err.message}`);
}

try {
  db.exec(createAddressTable);
  console.log("Address table created successfully");
} catch (err) {
  console.log(`Address Table Creation Error: ${err.message}`);
}


module.exports = db