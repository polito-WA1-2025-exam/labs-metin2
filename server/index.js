"use strict";
/* 
    Main server file for the application.
    This file sets up the Express server and defines the API endpoints.
*/
const express = require("express");
const cors = require("cors");
const passport = require("passport");

// import routes
const establishmentRouter = require("./routes/establishments");
const bagRouter = require("./routes/bags");
const userRouter = require("./routes/users");
const reservationRouter = require("./routes/reservations");
const authRouter = require("./routes/auth");
const session = require("express-session");

// import passport configuration
require("./utils/cypyto");

const app = express();
const PORT = 3001;

// enable CORS for requests from 5173
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json()); // parse JSON bodies

//  set up session management
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: "lax",
      secure: false, // Set to true if using HTTPS
    },
  })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Mount establishments routes
app.use("/api/establishments", establishmentRouter);
// Mount bags routes
app.use("/api/bags", bagRouter);
// Mount users routes
app.use("/api/users", userRouter);
// Mount reservations routes
app.use("/api/reservations", reservationRouter);
// Mount authentication routes
app.use("/api/auth", authRouter);

app.get("/api/ping", (req, res) => {
  res.json({ message: "pong" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// to do
// test all the api
