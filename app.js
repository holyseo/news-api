const express = require("express");
const { getTopics } = require("./controllers/getTopicsController");
const { getEndpoints } = require("./controllers/getEndpointsController");

const app = express();

app.get("/api", getEndpoints);
app.get("/api/topics", getTopics);

module.exports = app;
