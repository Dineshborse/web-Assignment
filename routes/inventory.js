const express = require("express");
const router = express.Router();
const InventoryInfo = require("../modals/inventory-modal")
const OrdersInfo = require("../modals/orders-modal")


router.get("/", (req, res) => {
    InventoryInfo.find().then((InventoryItems) => {
        // res.render("landingPage", { user: InventoryItems })
        res.send({ status: "success", data: InventoryItems })
    })
});
router.get("/electronics", (req, res) => {

    InventoryInfo.find({ InventoryType: "Electronics" }).then((InventoryItems) => {
        // res.render("landingPage", { user: InventoryItems })
        res.send({ status: "success", data: InventoryItems })
    })
})
router.get("/furniture", (req, res) => {
    InventoryInfo.find({ InventoryType: "Furniture" }).then((InventoryItems) => {
        // res.render("landingPage", { user: InventoryItems })
        res.send({ status: "success", data: InventoryItems })
    })
});

router.post("/add-item", (req, res) => {
    console.log(req.body)
    InventoryInfo.find().then((InventoryItems) => {
        InventoryInfo.create({
            Inventory_id: `INTD50${InventoryItems.length}`,
            InventoryType: req.body.inventoryType,//.toLowerCase(),
            ItemName: req.body.ItemName,
            availableQuantity: parseInt(req.body.quantity)
        }).then((val) => {
            console.log(val);
            res.send({ status: "success", data: val })
        }).catch((err)=>{
            console.log(err)
        })
    }).catch((err)=>{
        console.log(err)
    })
    
});
module.exports = router;