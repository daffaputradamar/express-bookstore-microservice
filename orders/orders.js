const express = require("express");
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

app.get("/orders/:id", (req, res) => {
  Order.findById(req.params.id)
    .then(order => {
      axios
        .get("http://localhost:5555/customers/" + order.custId)
        .then(response => {
          let orderObject = {
            custName: response.data.name,
            bookTitle: ""
          };
          axios
            .get("http://localhost:4545/books/" + order.bookId)
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

app.post("/orders", (req, res) => {
  Order.create({...req.body})
    .then(order => res.json(order))
    .catch(err => console.log(err));
});

app.delete("/orders/:id", (req, res) => {
  Order.findByIdAndDelete(req.params.id)
    .then(order => res.sendStatus(204))
    .catch(err => console.log(err));
});

app.listen(7777, () =>
  console.log("Order Service is Running on 7777")
);
