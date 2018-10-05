const mongoose = require("mongoose");

//Map global promises
mongoose.Promise = global.Promise;
//Mongoose connect
mongoose
  .connect(
    "mongodb://daffaputradamar:d4ff44kb4r@ds223653.mlab.com:23653/ordersservice",
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
