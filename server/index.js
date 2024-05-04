const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require('multer');
const path = require('path');
const app = express();
require("dotenv").config();

const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const fileRoute = require("./Routes/FileRoute")

const { MONGO_URL, PORT , FRONTEND} = process.env;

// Configure storage for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
const upload = multer({ storage: storage });

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});



app.use(
  cors({
    origin: [FRONTEND],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


app.use(cookieParser());

app.use(express.json());    
app.use(express.urlencoded({ extended: true }));
app.use("/", authRoute);
app.use("/file", fileRoute);
