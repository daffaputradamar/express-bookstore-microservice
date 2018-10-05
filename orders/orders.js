const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");

require("./config/db");

const Order = require("./models/Order");

const app = express();
app.use(express.json());

app.get("/orders", (req, res) => {
  Order.find()
    .then(orders => {
      res.json(orders);
    })
    .catch(err => console.log(err));
});

app.get("/order/:id", (req, res) => {
  Order.findById(req.params.id)
    .then(order => {
      axios
        .get("http://localhost:5555/customer/" + order.custId)
        .then(response => {
          let orderObject = {
            custName: response.data.name,
            bookTitle: ""
          };
          axios
            .get("http://localhost:4545/book/" + order.bookId)
            .then(response => {
              orderObject.bookTitle = response.data.title;
              res.json(orderObject);
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

app.post("/order", (req, res) => {
  const newOrder = {
    custId: mongoose.Types.ObjectId(req.body.custId),
    bookId: mongoose.Types.ObjectId(req.body.bookId),
    initDate: req.body.initDate,
    deliverDate: req.body.deliverDate
  };

  Order.create(newOrder)
    .then(order => console.log(order))
    .catch(err => console.log(err));

  res.send("Testing our order route");
});

app.delete("/order/:id", (req, res) => {
  Order.findByIdAndRemove(req.params.id)
    .then(order => console.log(order))
    .catch(err => console.log(err));

  res.send("Testing our delete route");
});

app.listen(7777, () =>
  console.log("Server app and running == This is Order Service")
);
