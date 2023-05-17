var express = require('express');
var router = express.Router();
const customer_controlers= require('../controllers/customer');
/* GET home page. */
const secured = (req, res, next) => {
    if (req.user) {
        return next();
    }
    req.session.returnTo = req.originalUrl;
    console.log(req.session.returnTo);
    res.redirect("/login");
}
router.get('/', customer_controlers.customer_view_all_Page);
router.get('/detail', customer_controlers.customer_view_one_Page);
/* GET create customer page */
router.get('/create', customer_controlers.customer_create_Page);
router.get('/update', customer_controlers.customer_update_Page);
router.get('/delete', customer_controlers.customer_delete_Page);
module.exports = router;
