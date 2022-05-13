require('dotenv').config();
const express = require('express');
const app = express();
const flightRouter = require("./api/admin/admin.router");
// const flightUserRouter = require("./api/user/user.router");

app.use(express.json());
app.use("/api/v1.0/flight", flightRouter);
// app.use("/api/v1.0/flight", flightUserRouter);

app.listen(process.env.APP_PORT, ()=> {
    console.log("Server Up and Running with port", process.env.APP_PORT);
})