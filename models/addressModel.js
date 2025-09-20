// const bcrypt = require("bcryptjs");
const db = require("../config/db")

const Address = {
    create:(id,addressDetails,city,state,pinCode,isActive) => {
        const stmt = db.prepare("SELECT * FROM customers WHERE id = ?");
        const user = stmt.get(id);
        // console.log(user)
        if(!user) return ("Invalid Customer Id")
        if(isActive === undefined) return isActive=0;
        try {
            const stmt = db.prepare(`INSERT INTO addresses (customer_id,address_details,city,state,pin_code,is_active) VALUES (?,?,?,?,?,?)`);
            const result = stmt.run(id,addressDetails,city,state,pinCode,isActive)
            // console.log("result:",stmt,result)
            return result;
        } catch (error) {
            throw error;
        }
    },

    // getByAddressId:(id) => {
    //     try {
    //         const stmt = db.prepare("SELECT * FROM addresses WHERE id=? ");
    //         const address = stmt.get(id)
    //         return address;
    //     } catch (error) {
    //         throw error;
    //     }
    // },

  getAllAddresses: (id) => {
    const stmt = db.prepare("SELECT * FROM addresses WHERE customer_id=?");
    return stmt.get(id); // returns all users as an array
  },

  updateAddressById: (addressId,data) => {
    const {addressDetails,customerId,city,state,pinCode,isActive} = data;
    const stmt = db.prepare(`
      UPDATE addresses 
      SET customer_id = ?, address_details = ?,city=?,state=?,pin_code=?,is_active=?
      WHERE id = ?
    `);
    const result = stmt.run(customerId,addressDetails,city,state,pinCode,isActive,addressId);
    if (result.changes > 0) {
      const stmt = db.prepare("SELECT * FROM addresses WHERE id = ?");
      const updateAddress = stmt.get(addressId); // returns user object or undefined
      return updateAddress;
    }
    return null;
  },

deleteAddressById: (addressId) => {
    try {
      const stmt = db.prepare("DELETE FROM addresses WHERE id = ?");
      const result = stmt.run(addressId);
      return result.changes > 0; // true if a row was deleted
    } catch (err) {
      throw err;
    }
  }

}

module.exports = Address;