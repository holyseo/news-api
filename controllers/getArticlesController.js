const {
  selectAllArticles,
  selectArticleByTopic,
  checkExists,
} = require("../models/articles");

exports.getAllArticles = async (req, res, next) => {
  const { topic } = req.query;

  try {
    if (req.originalUrl === "/api/articles" || topic.length === 0) {
      const articles = await selectAllArticles();
      res.status(200).send({ articles });
      return; // Exit the function after sending the response
    }

    const [articles] = await Promise.all([
      selectArticleByTopic(topic),
      checkExists(topic),
    ]);

    res.status(200).send({ articles });
  } catch (err) {
    next(err);
  }
};
