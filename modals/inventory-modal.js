const mongoose = require("mongoose");

const InventoryInfoSchema = new mongoose.Schema({
    Inventory_id: {
        type: String,
        required: true,
        unique: true
    },
    InventoryType: {
        type: String,
        required: true
    },
    ItemName: {
        type: String,
        required: true
    },
    availableQuantity: {
        type: Number,
        default:0,
    }
})

const InventoryInfo = mongoose.model("InventoryInfo", InventoryInfoSchema);
module.exports = InventoryInfo;