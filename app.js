const express = require("express");
const { getTopics } = require("./controllers/getTopicsController");

const app = express();

app.get("/api/topics", getTopics);

module.exports = app;
