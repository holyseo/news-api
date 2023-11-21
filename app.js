const express = require("express");
const { getTopics } = require("./controllers/getTopicsController");
const { getEndpoints } = require("./controllers/getEndpointsController");
const { getArticlesById } = require("./controllers/getArticlesByIdController");
const { getAllArticles } = require("./controllers/getArticlesController");
const {
  postCommentsByArticleId,
} = require("./controllers/postCommentsController");

const app = express();

app.get("/api", getEndpoints);
app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticlesById);
app.get("/api/articles", getAllArticles);

app.post("/api/articles/:article_id/comments", postCommentsByArticleId);

module.exports = app;
