var customer = require('../models/customer');
// List of all customers
exports.customer_list = function(req, res) {
 res.send('NOT IMPLEMENTED: Customer list');
};
// for a specific customer.
// for a specific customer.
exports.customer_detail = async function(req, res) {
console.log("detail" + req.params.id)
try {
result = await customer.findById( req.params.id)
res.send(result)
} catch (error) {
res.status(500)
res.send(`{"error": document for id ${req.params.id} not found`);
}
};

// Handle customer create on POST.
exports.customer_create_post = function(req, res) {
 res.send('NOT IMPLEMENTED: Customer create POST');
};
// Handle customer delete form on DELETE.
exports.customer_delete = function(req, res) {
 res.send('NOT IMPLEMENTED: Customer delete DELETE ' + req.params.id);
};
// Handle customer update form on PUT.
exports.customer_update_put = function(req, res) {
 res.send('NOT IMPLEMENTED: Customer update PUT' + req.params.id);
};
//Handle customer update form on PUT.
exports.customer_update_put = async function(req, res) {
console.log(`update on id ${req.params.id} with body
${JSON.stringify(req.body)}`)
try {
let toUpdate = await customer.findById( req.params.id)
// Do updates of properties
if(req.body.customer_type)
toUpdate.customer_type = req.body.customer_type;
if(req.body.cost) toUpdate.cost = req.body.cost;
if(req.body.size) toUpdate.size = req.body.size;
let result = await toUpdate.save();
console.log("Sucess " + result)
res.send(result)
} catch (err) {
res.status(500)
res.send(`{"error": ${err}: Update for id ${req.params.id}
failed`);
}
};


// List of all Customer
exports.customer_list = async function(req, res) {
    try{
    thecustomer = await customer.find();
    res.send(thecustomer);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
   };

   // VIEWS
// Handle a show all view
exports.customer_view_all_Page = async function(req, res) {
    try{
    thecustomer = await customer.find();
    res.render('customer', { title: 'Customer Search Results', results: thecustomer });
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
   };
   // Handle customer create on POST.
exports.customer_create_post = async function(req, res) {
    console.log(req.body)
    let document = new customer();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"customer_type":"goat", "cost":12, "size":"large"}
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