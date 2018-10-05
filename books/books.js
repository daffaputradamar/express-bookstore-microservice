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

app.get("/book/:id", (req, res) => {
  Book.findById(req.params.id)
    .then(book => res.json(book))
    .catch(err => console.log(err));
});

app.post("/book", (req, res) => {
  console.log(req.body);

  const newBook = {
    title: req.body.title,
    author: req.body.author,
    numberPages: req.body.numberPages,
    publisher: req.body.publisher
  };

  Book.create(newBook)
    .then(book => console.log(book))
    .catch(err => console.log(err));

  res.send("Testing our book route");
});

app.put("/book/:id", (req, res) => {
  Book.findById(req.params.id).then(book => {
    book
      .update(req.body, { fields: Object.keys(req.body) })
      .then(updatedUser => console.log(updatedUser));
  });

  res.send("Testing our update route");
});

app.delete("/book/:id", (req, res) => {
  Book.findByIdAndRemove(req.params.id)
    .then(book => console.log(book))
    .catch(err => console.log(err));

  res.send("Testing our delete route");
});

app.listen(4545, () =>
  console.log("Server app and running == This is Books Service")
);
