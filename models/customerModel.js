// const bcrypt = require("bcryptjs");
const db = require("../config/db")

const Customer = {
  create: (firstName,lastName,phoneNumber, email) => {
    // bcrypt.hashSync is synchronous (use hash if you need async, but better-sqlite3 is synchronous)
    if(!email){
        return email="";
    }
    // console.log("firstName:",firstName,lastName,phoneNumber,email)
    try {
      const stmt = db.prepare("INSERT INTO customers (first_name, last_name, phone_number,email) VALUES (?, ?,?,?)");
      // console.log("stmt:",stmt)
      const result = stmt.run(firstName,lastName,phoneNumber, email);
      // console.log("result:",result)
      return { id: result.lastInsertRowid };
    } catch (err) {
      // console.log(err)
      throw err;
    }
  },

  getByCustomerId: (id) => {
    try {
      const stmt = db.prepare("SELECT * FROM customers WHERE id = ?");
      const user = stmt.get(id); // returns user object or undefined
      return user;
    } catch (err) {
      throw err;
    }
  },

  getAll: () => {
    const stmt = db.prepare("SELECT * FROM customers");
    return stmt.all(); // returns all users as an array
  },

  updateById: (id, data) => {
    const {firstName,lastName,phoneNumber, email } = data;
    const stmt = db.prepare(`
      UPDATE customers 
      SET first_name = ?, last_name = ?,phone_number=?,email=?
      WHERE id = ?
    `);
    const result = stmt.run(firstName,lastName,phoneNumber, email, id);
    if (result.changes > 0) {
      const stmt = db.prepare("SELECT * FROM customers WHERE id = ?");
      const customer = stmt.get(id); // returns user object or undefined
      return customer;
    }
    return null;
  },

  deleteById: (id) => {
    try {
      const stmt = db.prepare("DELETE FROM customers WHERE id = ?");
      const result = stmt.run(id);
      return result.changes > 0; // true if a row was deleted
    } catch (err) {
      throw err;
    }
  }
};

module.exports = Customer;