var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var customer_controller = require('../controllers/customer');
/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// COSTUME ROUTES ///
// POST request for creating a Costume.
router.post('/customer', customer_controller.customer_create_post);
// DELETE request to delete Costume.
router.delete('/customer/:id', customer_controller.customer_delete);
// PUT request to update Costume.
router.put('/customer/:id', customer_controller.customer_update_put);
// GET request for one Costume.
router.get('/customer/:id', customer_controller.customer_detail);
// GET request for list of all Costume items.
router.get('/customer', customer_controller.customer_list);
module.exports = router;