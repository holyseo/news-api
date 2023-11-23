const { modifyVotesByArticleId } = require("../models/articles");

exports.updateVotesByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  modifyVotesByArticleId(article_id, inc_votes)
    .then((vote) => {
      res.status(200).send({ vote });
    })
    .catch((err) => {
      next(err);
    });
};
