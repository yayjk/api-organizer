const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const journalRoutes = require("./api/routes/journal/journal");
const todoRoutes = require("./api/routes/todo/todo");
const fileRoutes = require("./api/routes/files/file");
const memberRoutes = require("./api/routes/members");

mongoose.connect(
  "mongodb+srv://yayjk:tfKW5NYdRywnbNlD@organizeryayjk-ljhzj.mongodb.net/test?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// app.use((req, res, next) => {
//   req.header("Access-Control-Allow-Origin", "*");
//   req.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   if (req.method === "OPTIONS") {
//     req.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//     return res.status(200).json({});
//   }
//   next();
// });

app.use("/journal", journalRoutes);
app.use("/todo", todoRoutes);
app.use("/file", fileRoutes);
app.use("/members", memberRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
