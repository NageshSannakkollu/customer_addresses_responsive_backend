const sqlite3 = require("sqlite3");
const path = require("path")
const dbPath = path.join(__dirname,"database.db");

let db = new sqlite3.Database(dbPath,(err) => {
    if(err){
        console.log(`DB Connection Error:${err.message}`)
    }else{
        console.log(`DB Connected Successfully!`)
    }
});

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
  )`;

   
db.run(createCustomerTable, (err) => {
    if (err) {
        return console.error('Error creating table:', err.message);
    }
    console.log('Customer Table created successfully');
});

db.run(createAddressTable, (err) => {
    if (err) {
        return console.error('Error creating table:', err.message);
    }
    console.log('Address Table created successfully');
});

module.exports =  db;