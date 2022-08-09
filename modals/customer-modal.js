const mongoose = require("mongoose");

const CustomerInfoSchema = new mongoose.Schema({
    Customer_id: {
        type: String,
        required: true
    },
    Customer_name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    }
})

const CustomerInfo = mongoose.model("CustomerInfo", CustomerInfoSchema);
module.exports = CustomerInfo;