var Customer = require('../models/customer');
// List of all Customers
exports.Customer_list = async function(req, res) {
//res.send('NOT IMPLEMENTED: Customer list');
try{
    result = await Customer.find();
    res.send(result);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
};
// for a specific Customer.
exports.Customer_detail = async function(req, res) {
    console.log("detail" + req.params.id)
    try {
        result = await Customer.findById( req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
};
    

// Handle Customer create on POST.
exports.Customer_create_post = async function(req, res) {
    console.log(req.body)
    let document = new Customer();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"Customer_type":"goat", "cost":12, "size":"large"}
    document.Cust_Name = req.body.Cust_Name;
    document.Cust_Age = req.body.Cust_Age;
    document.Mail_Id = req.body.Mail_Id;
    try{
    let result = await document.save();
    res.send(result);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };
    


// Handle Customer delete form on DELETE.
exports.Customer_delete = async function(req, res) {
    console.log("delete " + req.params.id)
    try {
        result = await Customer.findByIdAndDelete( req.params.id)
        console.log("Removed " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": Error deleting ${err}}`);
    }
};

    
// Handle Customer update form on PUT.
exports.Customer_update_put = async function(req, res) {
    console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`)
    try {
    let toUpdate = await Customer.findById( req.params.id)
    // Do updates of properties
        if(req.body.Cust_Name) toUpdate.Cust_Name = req.body.Cust_Name;
        if(req.body.Cust_Age) toUpdate.cost = req.body.Cust_Age;
        if(req.body.Mail_Id) toUpdate.Mail_Id = req.body.Mail_Id;
        let result = await toUpdate.save();
        console.log("Sucess " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id} failed`);
    }
};




// VIEWS
// Handle a show all view
exports.Customer_view_all_Page = async function(req, res) {
    try{
    Customer = await Customer.find();
    res.render('Customer', { title: 'Customer Search Results', results: Customer });
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };

   // Handle a show one view with id specified by query
exports.Customer_view_one_Page = async function(req, res) {
    console.log("single view for id " + req.query.id)
    try{
        result = await Customer.findById( req.query.id)
        res.render('customerdetail', { title: 'Customer Detail', toShow: result });
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

exports.Customer_create_Page = function(req, res) {
    console.log("create view")
    try{
        res.render('customercreate', { title: 'Customer Create'});
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

exports.Customer_update_Page = async function(req, res) {
    console.log("update view for Customer "+req.query.id)
    try{
        let result = await Customer.findById(req.query.id)
        res.render('customerupdate', { title: 'Customer Update', toShow: result });
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};
    
    
exports.Customer_delete_Page = async function(req, res) {
    console.log("Delete view for id " + req.query.id)
    try{
        result = await Customer.findById(req.query.id)
        res.render('customerdelete', { title: 'Customer Delete', toShow:
        result });
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};
    