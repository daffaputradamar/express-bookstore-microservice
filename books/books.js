const express = require("express");
const app = express();

require("./config/db");

const Book = require("./models/Book");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is our main endpoint");
});

app.get("/books", (req, res) => {
  Book.find()
    .then(books => {
      res.json(books);
    })
    .catch(err => console.log(err));
});

app.get("/books/:id", (req, res) => {
  Book.findById(req.params.id)
    .then(book => res.json(book))
    .catch(err => console.log(err));
});

app.post("/books", (req, res) => {
  
  Book.create(req.body)
    .then(book => res.json(book))
    .catch(err => console.log(err));
});

app.put("/books/:id", (req, res) => {
  Book.findOneAndUpdate(
    {_id: req.params.id},
    {$set: req.body},
    {new: true}
  )
    .then(user => res.json(user))
    .catch(err => console.log(err))
})

app.delete("/books/:id", (req, res) => {
  Book.findByIdAndDelete(req.params.id)
    .then(res.sendStatus(204))
    .catch(err => console.log(err))
});

app.listen(4545, () =>
  console.log("Books Service is Running on 4545")
);
