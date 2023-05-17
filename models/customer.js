const mongoose = require("mongoose");
const customerSchema = mongoose.Schema({
  Cust_Name: {
    type: String,
    required: true,
    unique: true,
    minLength: [5, "Name of the customer is not valid"],
  },
  Cust_Age: {
    type: Number,
    required: true,
    minLength: [1, "Age of the customer is not valid"],
  },
  Mail_Id: {
    type: String,
    required: true,
    min: [10, "Mail Id of the customer is not valid"],
  },
});
module.exports = mongoose.model("customer", customerSchema);
