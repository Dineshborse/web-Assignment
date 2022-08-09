const mongoose = require("mongoose");

const OrdersInfoSchema = new mongoose.Schema({
    Customer_id: {
        type: String,
        required: true
    },
    cart:{
        type: Array,
        default:[]
    }
    // Inventory_id: {
    //     type: String,
    //     required: true
    // },
    // ItemName: {
    //     type: String,
    //     required: true
    // },
    // quantity: {
    //     type: Number,
    //     required: true
    // },
})

const OrdersInfo = mongoose.model("OrdersInfo", OrdersInfoSchema);
module.exports = OrdersInfo;