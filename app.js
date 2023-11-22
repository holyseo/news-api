const express = require("express");
const { getTopics } = require("./controllers/getTopicsController");
const { getEndpoints } = require("./controllers/getEndpointsController");
const { getArticlesById } = require("./controllers/getArticlesByIdController");
const { getAllArticles } = require("./controllers/getArticlesController");
const { getComments } = require("./controllers/getCommentsController");
const {
  handlePsqlError,
  handleCustomErros,
  handleServerErrors,
} = require("./error");

const app = express();

app.get("/api", getEndpoints);
app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticlesById);
app.get("/api/articles", getAllArticles);
app.get("/api/articles/:article_id/comments", getComments);

app.use(handlePsqlError);
app.use(handleCustomErros);
// app.use(handleServerErrors);

module.exports = app;
