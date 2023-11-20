const { selectArticleById } = require("../models/articles");

exports.getArticlesById = (req, res) => {
  const { article_id } = req.params;
  selectArticleById(article_id).then((article) => {
    console.log(article);
    res.status(200).send(article);
  });
};
