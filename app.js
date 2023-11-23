const express = require("express");
const { getTopics } = require("./controllers/getTopicsController");
const { getEndpoints } = require("./controllers/getEndpointsController");
const { getArticlesById } = require("./controllers/getArticlesByIdController");
const { getAllArticles } = require("./controllers/getArticlesController");
const {
  postCommentsByArticleId,
} = require("./controllers/postCommentsController");
const { handlePsqlErrors, handleCustomErrors } = require("./error");
const {
  updateVotesByArticleId,
} = require("./controllers/patchVotesByArticleIdController");

const app = express();

app.use(express.json());

app.get("/api", getEndpoints);
app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticlesById);
app.get("/api/articles", getAllArticles);

app.post("/api/articles/:article_id/comments", postCommentsByArticleId);

app.patch("/api/articles/:article_id", updateVotesByArticleId);

app.use(handlePsqlErrors);
app.use(handleCustomErrors);

module.exports = app;
