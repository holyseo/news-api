const { addCommentsById } = require("../models/comments");

exports.postCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  addCommentsById(article_id, req.body)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};
