// Register Address  

const Address = require("../models/addressModel");
const Customer = require("../models/customerModel");

const addressRegistration = async(req,res) => {
    const {addressDetails,city,state,pinCode,isActive} = req.body 
    const {id} =req.params;
    try {
        const newAddress =Address.create(id,addressDetails,city,state,pinCode,isActive);
        return res.status(201).json({
            message:"New Address Created Successfully",
            success:true,
            newAddress
        });
    } catch (error) {
        res.status(500).json({message:"Address Registration Error",success:true})
    }
}

const getAllAddressesList = (req, res) => {
    const {id} = req.params;
  try {
    const addresses = Address.getAllAddresses(id); // synchronous method on your user model to get all users
    return res.status(200).json({
      success: true,
      addresses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve Addresses",
    });
  }
};

// const getAddressById = (req,res) => {
//     const {id} = req.params;
//     console.log("id:",id)
//     try {
//     const address = Address.getByAddressId(id);
//     if(address !== undefined){
//       return res.status(200).json({
//       success: true,
//       address,
//     });
//   } return res.status(401).json("Address ID not found!") // synchronous method on your user model to get all users
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Failed to retrieve Address",
//     });
//   }
// }

const updateAddress = (req, res) => {
  const { addressId } = req.params;
  const data = req.body;

  try {
    const updatedAdd = Address.updateAddressById(addressId, data); // <-- custom model method
    if (updatedAdd) {
      return res.status(200).json({
        success: true,
        message: "Address updated successfully",
        address: updatedAdd,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to update address",
      error: err.message,
    });
  }

};

const deleteAddress = (req, res) => {
  const { addressId } = req.params;
//   res.send({"ID":id})
  try {
    const success = Customer.deleteAddressById(addressId);
    if (success) {
      return res.status(200).json({ success: true, message: "Address deleted" });
    } else {
      return res.status(404).json({ success: false, message: "Address not found" });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to delete Address" });
  }
};

module.exports = {addressRegistration,getAllAddressesList,updateAddress,deleteAddress}