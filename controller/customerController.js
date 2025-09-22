const Customer = require("../models/customerModel");

// Registration endpoint
const customerRegistration = async (req, res) => {
  const { firstName,lastName,phoneNumber, email } = req.body;
  console.log("Data:",req.body)
  try {
    // Will throw if duplicate email, etc.
    const newCustomer = Customer.create(firstName,lastName,phoneNumber, email);
    return res.status(201).json({
      message: "New Customer Created Successfully!",
      customer: {firstName:newCustomer.first_name,lastName:newCustomer.last_name,phoneNumber:newCustomer.phone_number,email},
      success: true
    });
  } catch (err) {
    if (err && err.message && err.message.toLowerCase().includes("unique constraint")) {
      // better-sqlite3 will throw for unique email violation
      return res.status(200).json({ message: "Phone Number already exists", success: false });
    }
    return res.status(500).json({ message: "Registration error", success: false });
  }
};

// ALL users
const getAllCustomers = (req, res) => {
  try {
    const customers = Customer.getAll(); // synchronous method on your user model to get all users
    console.log("customers:",customers)
    return res.status(200).json({
      success: true,
      customers
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve customers",
    });
  }
};

const getCustomerByEmail = (req,res) => {
    const {email} = req.body;
    try {
    const users = Customer.getByEmail(email); // synchronous method on your user model to get all users
    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve users",
    });
  }
}

const getCustomerById = (req,res) => {
    const {id} = req.params;
    console.log("id:",id)
    try {
    const users = Customer.getByCustomerId(id);
    if(users !== undefined){
      return res.status(200).json({
      success: true,
      users,
    });
  } return res.status(401).json("Customer ID not found!") // synchronous method on your user model to get all users
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve user",
    });
  }
}

const updateCustomer = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  console.log("Update:",req.body)
  try {
    const updatedCustomer = Customer.updateById(id, data); // <-- custom model method
    if (updatedCustomer) {
      return res.status(200).json({
        success: true,
        message: "Customer updated successfully",
        user: updatedCustomer,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to update Customer",
      error: err.message,
    });
  }

};

const deleteCustomer = (req, res) => {
  const { id } = req.params;
//   res.send({"ID":id})
  try {
    const success = Customer.deleteById(id);
    if (success) {
      return res.status(200).json({ success: true, message: "Customer deleted Successfully" });
    } else {
      return res.status(404).json({ success: false, message: "Customer not found" });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to delete Customer" });
  }
};

module.exports = { customerRegistration,getAllCustomers,getCustomerByEmail,deleteCustomer,updateCustomer,getCustomerById };