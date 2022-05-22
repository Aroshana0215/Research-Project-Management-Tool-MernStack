const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
//const { notFound, errorHandler} = require("./middlewares/errormiddleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

const URL = process.env.MONGOBD_URL;

mongoose.connect(
  URL,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) throw err;
    console.log("connocted to mongodb");
  }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on port`, PORT);
});

app.use("/user", require("./routers/userRoute.js"));
