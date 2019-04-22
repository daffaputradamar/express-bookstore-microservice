const mongoose = require("mongoose");

//Mongoose connect
mongoose
  .connect(
    "mongodb+srv://customerservice:customerservice@customerservice-16qkp.mongodb.net/test?retryWrites=true",
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
