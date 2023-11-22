const {
  selectCommentsByArticleId,
  checkExists,
} = require("../models/comments");

exports.getComments = (req, res, next) => {
  const { article_id } = req.params;

  const pendingComments = selectCommentsByArticleId(article_id);
  const pendingPromises = [pendingComments];

  if (article_id) {
    pendingPromises.push(checkExists(article_id));
  }

  Promise.all(pendingPromises)
    .then(([comments, doesExist]) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};
