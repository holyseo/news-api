const express = require("express");
const { getTopics } = require("./controllers/getTopicsController");
const { getEndpoints } = require("./controllers/getEndpointsController");
const { getArticlesById } = require("./controllers/getArticlesByIdController");
const { getAllArticles } = require("./controllers/getArticlesController");
const {
  postCommentsByArticleId,
} = require("./controllers/postCommentsController");

const app = express();

app.use(express.json());

app.get("/api", getEndpoints);
app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticlesById);
app.get("/api/articles", getAllArticles);

app.post("/api/articles/:article_id/comments", postCommentsByArticleId);

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(404).send({ msg: "invalid request" });
  } else if (err.code === "23503") {
    res.status(404).send({ msg: "article not found" });
  }
});

module.exports = app;
