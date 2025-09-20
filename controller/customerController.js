const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Customer = require("../models/customerModel");

// Registration endpoint
const customerRegistration = async (req, res) => {
  const { firstName,lastName,phoneNumber, email } = req.body;
  try {
    // Will throw if duplicate email, etc.
    const newCustomer = Customer.create(firstName,lastName,phoneNumber, email);
    return res.status(201).json({
      message: "New Customer Created Successfully!",
      customer: newCustomer,
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

// // Login endpoint
// const loginCustomer = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = Customer.getByEmail(email);
//     if (!user) {
//       return res.status(200).json({ message: "Invalid Email Address!", success: false });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(200).json({ message: "Invalid password!!", success: false });
//     }

//     const payload = { email: email };
//     const token = jwt.sign(payload, `${process.env.JWT_SECRET}`);

//     res.status(200).json({
//       jwtToken: token,
//       success: true,
//       message: "Login Success",
//       user
//     });
//   } catch (err) {
//     return res.status(500).json({ message: "Login error", success: false });
//   }
// };

// ALL users
const getAllCustomers = (req, res) => {
  try {
    const customers = Customer.getAll(); // synchronous method on your user model to get all users
    return res.status(200).json({
      success: true,
      customers,
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
      return res.status(200).json({ success: true, message: "Customer deleted" });
    } else {
      return res.status(404).json({ success: false, message: "Customer not found" });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to delete Customer" });
  }
};

module.exports = { customerRegistration,getAllCustomers,getCustomerByEmail,deleteCustomer,updateCustomer,getCustomerById };