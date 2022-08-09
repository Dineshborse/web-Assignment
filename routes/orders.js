const express = require("express");
const router = express.Router();
const InventoryInfo = require("../modals/inventory-modal")
const OrdersInfo = require("../modals/orders-modal")
const CustomerInfo = require("../modals/customer-modal")

router.get("/allorders", (req, res) => {
    OrdersInfo.find().then((orders) => {
        // res.render("landingPage", { user: orders })
        res.send({ status: "success", data: orders })
    })
});
router.get("/:customerId", (req, res) => {

    OrdersInfo.find({ Customer_id: req.params.customerId }).then((orders) => {
        // res.render("landingPage", { user: orders })
        res.send({ status: "success", data: orders })
    })
})
router.post("/new-order", (req, res) => {
    let newCart =[];
    InventoryInfo.find({
        Inventory_id: req.body.Inventory_id
    }).then((itemsFound) => {
        if (itemsFound.length) {
            if (itemsFound[0].availableQuantity >= req.body.quantity) {
                CustomerInfo.find({ Email: req.body.Email, }).then((usersFound) => {
                    console.log(usersFound)
                    if (usersFound.length) {
                        OrdersInfo.find({ Customer_id: usersFound[0].Customer_id })
                            .then((customersFound) => {
                                if (customersFound.length) {
                                    newCart=[...customersFound[0].cart, {
                                        Inventory_id: req.body.Inventory_id,
                                        ItemName: itemsFound[0].ItemName,
                                        quantity: req.body.quantity
                                    }]
                                    OrdersInfo.updateOne({ Customer_id: usersFound[0].Customer_id },
                                        {
                                            $set: {
                                                cart: newCart
                                            }
                                        }).then((UpdateDbRes) => {
                                            console.log(UpdateDbRes)
                                            InventoryInfo.updateOne({ Inventory_id: req.body.Inventory_id },
                                                { $set: { availableQuantity: itemsFound[0].availableQuantity - req.body.quantity } })
                                                .then(() => {
                                                    res.status(200).send({
                                                        status: "success",
                                                        data: {
                                                            Customer_id: usersFound[0].Customer_id,
                                                            Customer_name: usersFound[0].Customer_name,
                                                            cart: newCart
                                                        }
                                                    })
                                                })
                                                .catch((err) => {
                                                    console.log(err)
                                                })
                                        })
                                }
                            })
                    }
                    else {
                        OrdersInfo.find().then((allorders) => {
                            OrdersInfo.create({
                                Customer_id: `OD10${allorders.length}`,
                                cart: [{
                                    Inventory_id: req.body.Inventory_id,
                                    ItemName: itemsFound[0].ItemName,
                                    quantity: req.body.quantity
                                }]

                            }).then((DbResponse) => {
                                InventoryInfo.updateOne({ Inventory_id: req.body.Inventory_id },
                                    { $set: { availableQuantity: itemsFound[0].availableQuantity - req.body.quantity } })
                                    .catch((err) => {
                                        console.log(err)
                                    })
                                CustomerInfo.create({
                                    Customer_id: DbResponse.Customer_id,
                                    Customer_name: req.body.Customer_name,
                                    Email: req.body.Email,
                                }).then((CustomerInfo_create_res) => {
                                    res.status(200).send({
                                        status: "success",
                                        data: {
                                            Customer_id: DbResponse.Customer_id,
                                            Customer_name: req.body.Customer_name,
                                            cart: DbResponse.cart
                                        }
                                    })
                                })

                            })
                        })
                    }
                })
            }
            else {
                res.status(400).send({ status: "failed", message: "out of stock" })
            }
        }
        else {
            res.status(400).send({ status: "failed", message: "invalid item" })
        }

    }).catch((err) => {
        console.log(err)
    })

});

module.exports = router;