const express = require("express");

const router = express.Router();

const { v4: uuidv4 } = require("uuid");

const stripe = require("stripe")(
  "sk_test_51KbHjnLuT9YuvaHTOuBxZ5oKPgXw3uabe5Av5krD4R3Yy68RVyWfuFloyTYVVlh89DKkWhSS0Mf2n6FgUJvKltjE00HMAJkXki"
);

const Order = require("../models/orderModel");

router.post("/placeorder", async (req, res) => {
  const { token, subtotal, currentUser, cartItems } = req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: subtotal * 100,
        currency: "INR",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {

        const newOrder = new Order({

            name : currentUser.name,
            email : currentUser.email,
            userid : currentUser._id,
            orderItems : cartItems,
            orderAmount : subtotal ,
            shippingAddress : {
                   street : token.card.address_line1,
                   city : token.card.address_city,
                   country: token.card.address_country,
                   pincode : token.card.address_zip
            },

            transactionId :  payment.source.id
         

        })

        newOrder.save()
      res.send(" Order place succesfully ");
    } else {
      res.send("payment fail");
    }
  } catch (error) {
    return res.status(400).json({ messsage: "something went wrong" });
  }
});



router.post("/getuserorders", async (req, res) => {
  
   const {userid} =  req.body

   try {

    const orders = await Order.find({userid : userid }).sort({_id : -1})
     res.send(orders)
   } catch (error) {
     return res.status(400).json({ message : "something went wrong " })
   }
  
});
module.exports = router;
