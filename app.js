const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const InventoryInfo = require("./modals/inventory-modal")
// const OrdersInfo = require("./modals/orders-modal")
const inventoryController = require("./routes/inventory")
const ordersController = require("./routes/orders")
// setup view engine
// app.set("view engine", "ejs");



//Body parser to support JSON and form encoding
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


mongoose.connect("mongodb://localhost/api_web_tech_assignment").then(() => {
    console.log("connected to mongoDB")
}).catch((err) => {
    console.log(err);
});

const port = 3000;
//create and start express server
app.listen(port, (err) => {
    if (!err) {
        console.log(`server is running`)
    }
})





//middleware
app.use("/inventory", inventoryController);
app.use("/orders", ordersController);
