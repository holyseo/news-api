const {
  selectAllArticles,
  selectArticleByTopic,
  checkExists,
} = require("../models/articles");

exports.getAllArticles = (req, res, next) => {
  const { topic } = req.query;
  if (req.originalUrl === "/api/articles" || topic.length === 0) {
    selectAllArticles()
      .then((articles) => {
        res.status(200).send({ articles });
      })
      .catch((err) => {
        next(err);
      });
  }

  const pendingArticles = selectArticleByTopic(topic);
  const pendingPromises = [pendingArticles];

  if (topic) {
    pendingPromises.push(checkExists(topic));
  }

  Promise.all(pendingPromises)
    .then(([articles, doesExist]) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};
