const mongoose = require("mongoose")
const CustomerSchema = mongoose.Schema({
    Cust_Name: String,
    Cust_Age: Number,
    Mail_Id: String
})
module.exports = mongoose.model("Customer",
CustomerSchema)