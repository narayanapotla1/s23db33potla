var express = require('express');
const Customer_controlers= require('../controllers/customer');
var router = express.Router();
/* GET Customers */
router.get('/', Customer_controlers.Customer_view_all_Page );

router.get('/customers/:id', Customer_controlers.Customer_detail);

/* GET detail customer page */
router.get('/detail', Customer_controlers.Customer_view_one_Page);

router.get('/create', Customer_controlers.Customer_create_Page);

router.get('/update', Customer_controlers.Customer_update_Page);

router.get('/delete', Customer_controlers.Customer_delete_Page);

module.exports = router;

