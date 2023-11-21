const { selectCommentsByArticleId } = require("../models/comments");

exports.getComments = (req, res) => {
  const { article_id } = req.params;
  selectCommentsByArticleId(article_id).then((comments) => {
    res.status(200).send({ comments });
  });
};
