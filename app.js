const express = require("express");
const { getTopics } = require("./controllers/getTopicsController");
const { getEndpoints } = require("./controllers/getEndpointsController");
const { getArticlesById } = require("./controllers/getArticlesByIdController");
const { getAllArticles } = require("./controllers/getArticlesController");
const {
  postCommentsByArticleId,
} = require("./controllers/postCommentsController");
const { getComments } = require("./controllers/getCommentsController");
const { handlePsqlError, handleCustomErros } = require("./error");

const app = express();

app.use(express.json());

app.get("/api", getEndpoints);
app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticlesById);
app.get("/api/articles", getAllArticles);
app.get("/api/articles/:article_id/comments", getComments);

app.post("/api/articles/:article_id/comments", postCommentsByArticleId);

app.use(handlePsqlError);
app.use(handleCustomErros);

module.exports = app;
