const { selectAllArticles } = require("../models/articles");

exports.getAllArticles = (req, res) => {
  selectAllArticles().then((articles) => {
    res.status(200).send({ articles });
  });
};
