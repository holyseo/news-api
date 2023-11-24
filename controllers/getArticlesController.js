const { selectAllArticles } = require("../models/articles");
const { selectArticleByTopic } = require("../models/comments");

exports.getAllArticles = (req, res, next) => {
  const { topic } = req.query;
  if (req.originalUrl === "/api/articles" || topic.length === 0) {
    selectAllArticles().then((articles) => {
      res.status(200).send({ articles });
    });
  }

  selectArticleByTopic(topic)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};
