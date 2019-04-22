const express = require("express")
const app = express()

require("./config/db")

const Customer = require("./models/Customer")

app.use(express.json())

app.get("/", (req, res) => {
  res.send("This is our main endpoint")
})

app.get("/customers", (req, res) => {
  Customer.find()
    .then(customers => {
      res.json(customers)
    })
    .catch(err => console.log(err))
})

app.get("/customers/:id", (req, res) => {
  Customer.findById(req.params.id)
    .then(customer => res.json(customer))
    .catch(err => console.log(err))
})

app.post("/customers", (req, res) => {
  Customer.create({...req.body})
    .then(customer => res.json(customer))
    .catch(err => console.log(err))
})

app.put("/customers/:id", (req, res) => {
  Customer.findOneAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {new: true}
    )
      .then(customer => res.json(customer))
})

app.delete("/customers/:id", (req, res) => {
  Customer.findByIdAndDelete(req.params.id)
    .then(customer => res.sendStatus(204))
    .catch(err => console.log(err))
})

app.listen(5555, () =>
  console.log("Customer Service is Running on 5555")
)
