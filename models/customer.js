const mongoose = require("mongoose")
const customerSchema = mongoose.Schema({
    Cust_Name: String,
    Cust_Age: Number,
    Mail_Id: String
})
module.exports = mongoose.model("customer",customerSchema)
