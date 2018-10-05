const mongoose = require("mongoose");

//Map global promises
mongoose.Promise = global.Promise;
//Mongoose connect
mongoose
  .connect(
    "mongodb://daffaputradamar:d4ff44kb4r@ds119853.mlab.com:19853/booksservice",
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
