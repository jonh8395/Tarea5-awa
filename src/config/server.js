const express = require('express');
const app = express();

app.use(express.json());

app.set("port",3012);

module.exports = app;