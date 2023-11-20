const { selectAllArticles } = require("../models/articles");

exports.getAllArticles = (req, res) => {
  selectAllArticles().then((response) => {
    res.status(200).send(response);
  });
};
