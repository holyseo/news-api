const express = require("express");
const cors = require("cors");
const { getTopics } = require("./controllers/getTopicsController");
const { getEndpoints } = require("./controllers/getEndpointsController");
const { getArticlesById } = require("./controllers/getArticlesByIdController");
const { getAllArticles } = require("./controllers/getArticlesController");
const {
  postCommentsByArticleId,
} = require("./controllers/postCommentsController");
const {
  updateVotesByArticleId,
} = require("./controllers/patchVotesByArticleIdController");
const { getComments } = require("./controllers/getCommentsController");
const { handlePsqlErrors, handleCustomErrors } = require("./error");
const {
  deleteCommentById,
} = require("./controllers/deleteCommentByIdController");
const { selectAllComments } = require("./models/comments");
const { getAllUsers } = require("./controllers/getAllUsersController");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api", getEndpoints);
app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticlesById);
app.get("/api/articles/:article_id/comments", getComments);
app.get("/api/comments", selectAllComments);
app.get("/api/users", getAllUsers);

app.post("/api/articles/:article_id/comments", postCommentsByArticleId);

app.patch("/api/articles/:article_id", updateVotesByArticleId);

app.delete("/api/comments/:comment_id", deleteCommentById);

app.get("/api/articles", getAllArticles);

app.use(handlePsqlErrors);
app.use(handleCustomErrors);

module.exports = app;
