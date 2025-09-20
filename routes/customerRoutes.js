const express = require('express');
const { customerRegistration, getAllCustomers, getCustomerById, updateCustomer, deleteCustomer } = require('../controller/customerController');
const router = express.Router();

router.post('/customers',customerRegistration)
router.get('/customers',getAllCustomers)
router.get('/customers/:id',getCustomerById)
router.put('/customers/:id',updateCustomer)
router.delete('/customers/:id',deleteCustomer)

module.exports = router;