const express = require('express')
const { addressRegistration, getAllAddressesList, updateAddress, deleteAddress } = require('../controller/addressController')
const router = express.Router()

router.post('/customers/:id/addresses',addressRegistration)
router.get('/customers/:id/addresses',getAllAddressesList)
router.put('/addresses/:addressId',updateAddress)
router.delete('/addresses/:addressId',deleteAddress)

module.exports = router;