const express = require("express");
const compression = require("compression");
const mongoose = require('mongoose');
const cors = require("cors");
const helmet = require("helmet");
const routes = require("./routes");
const config = require('./config/config');
const app = express();

app.set('view engine', 'pug');
app.set('views', './src/views')
// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

// v1 api routes
app.use("/", routes);

module.exports = app;
