const { removeCommentById } = require("../models/comments");

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  removeCommentById(comment_id)
    .then((deleted) => {
      res.status(204).send();
    })
    .catch(next);
};
