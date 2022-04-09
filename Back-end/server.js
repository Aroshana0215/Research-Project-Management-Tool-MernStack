const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
//const { notFound, errorHandler} = require("./middlewares/errormiddleware");

require("dotenv").config();
const app = express();

//const PORT = process.env.PORT || 8070;
const PORT = process.env.PORT || 5006;

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const URL = process.env.MONGOBD_URL;

mongoose.connect(URL, {
  //useCreateIndex:true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useFindAndModify:false
});

//app.use(notFound);
//app.use(errorHandler);

const connction = mongoose.connection;
connction.once("open", () => {
  console.log("Mongodb Connection success");
});
app.listen(PORT, () => {
  console.log(`Server running on port : ${PORT}`);
});
