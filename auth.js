/** @format */

const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Hello World Cats");
// });
// app.get("/employees", (req, res) => {
//   res.send("Employees");
// });

const connectDB = require("./config/db");
//Load config
dotenv.config({ path: "./config/config.env" });

connectDB();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
// app.use(
//   cors({
//     origin: "*",
//   })
// );
//routes
app.use("/", require("./routes/index"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`Server running at port: ${PORT}`));
