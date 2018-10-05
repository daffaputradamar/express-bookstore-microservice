const express = require("express");
const app = express();

require("./config/db");

const Customer = require("./models/Customer");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is our main endpoint");
});

app.get("/customers", (req, res) => {
  Customer.find()
    .then(customers => {
      res.json(customers);
    })
    .catch(err => console.log(err));
});

app.get("/customer/:id", (req, res) => {
  Customer.findById(req.params.id)
    .then(customer => res.json(customer))
    .catch(err => console.log(err));
});

app.post("/customer", (req, res) => {
  console.log(req.body);

  const newCust = {
    name: req.body.name,
    age: req.body.age,
    address: req.body.address
  };

  Customer.create(newCust)
    .then(customer => console.log(customer))
    .catch(err => console.log(err));

  res.send("Testing our customer route");
});

app.put("/customer/:id", (req, res) => {
  Customer.findById(req.params.id).then(customer => {
    customer
      .update(req.body, { fields: Object.keys(req.body) })
      .then(updatedUser => console.log(updatedUser));
  });

  res.send("Testing our update route");
});

app.delete("/customer/:id", (req, res) => {
  Customer.findByIdAndRemove(req.params.id)
    .then(customer => console.log(customer))
    .catch(err => console.log(err));

  res.send("Testing our delete route");
});

app.listen(5555, () =>
  console.log("Server app and running == This is Customer Service")
);
