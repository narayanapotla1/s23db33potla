var customer = require('../models/customer');
// List of all customers

exports.customer_list = async function (req, res) {
    try {
        thecustomer = await customer.find();
        res.send(thecustomer);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
// for a specific customer.
exports.customer_detail = async function (req, res) {
    console.log("detail" + req.params.id)
    try {
        result = await customer.findById(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
};
// Handle customer create on POST.
exports.customer_create_post = function (req, res) {
    res.send('NOT IMPLEMENTED: customer create POST');
};
// Handle customer delete form on DELETE.
exports.customer_delete = async function (req, res) {
    console.log("delete " + req.params.id)
    try {
        result = await customer.findByIdAndDelete(req.params.id)
        console.log("Removed " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": Error deleting ${err}}`);
    }
};
// Handle customer update form on PUT.
exports.customer_update_put = async function (req, res) {
    console.log(`update on id ${req.params.id} with body
    ${JSON.stringify(req.body)}`)
    try {
        let toUpdate = await customer.findById(req.params.id)
        console.log(toUpdate);
        // Do updates of properties
        if (req.body.Cust_Name) toUpdate.Cust_Name = req.body.Cust_Name;
        if (req.body.Cust_Age) toUpdate.Cust_Age = req.body.Cust_Age;
        if (req.body.Mail_Id) toUpdate.Mail_Id = req.body.Mail_Id;
        let result = await toUpdate.save();
        console.log("Sucess " + result)
        res.send(result)
        
    } catch (err) {
        // console.log(err);
        var temp = Object.keys(err.errors)[0]
        console.log(JSON.stringify(err.errors[temp].message));
        res.status(500)
        res.send(`{'error': '${err}'}`);
    // res.send(`{"error": "${err.errors[temp].message} failed"}`);
    }
};
exports.customer_view_all_Page = async function (req, res) {
    try {
        thecustomer = await customer.find();
        res.render('customer', { title: 'Customer Search Results', results: thecustomer });
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
exports.customer_view_one_Page = async function (req, res) {
    console.log("single view for id " + req.query.id)
    try {
        result = await customer.findById(req.query.id)
        res.render('customerdetail',
            { title: 'customer Detail', toShow: result });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};
exports.customer_create_post = async function (req, res) {
    console.log(req.body)
    let document = new customer();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"customer_type":"goat", "cost":12, "size":"large"}
    document.Cust_Name = req.body.Cust_Name;
    document.Cust_Age = req.body.Cust_Age;
    document.Mail_Id = req.body.Mail_Id;
    try {
        let result = await document.save();
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
exports.customer_create_Page = function (req, res) {
    console.log("create view")
    try {
        res.render('customercreate', { title: 'customer Create' });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

exports.customer_update_Page = async function (req, res) {
    console.log("update view for item " + req.query.id)
    try {
        let result = await customer.findById(req.query.id)
        res.render('customerupdate', { title: 'customer Update', toShow: result });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

exports.customer_delete_Page = async function (req, res) {
    console.log("Delete view for id " + req.query.id)
    try {
        result = await customer.findById(req.query.id)
        res.render('customerdelete', {
            title: 'customer Delete', toShow:
                result
        });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};
