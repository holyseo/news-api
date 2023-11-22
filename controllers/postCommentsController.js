const { addCommentsById } = require("../models/comments");

exports.postCommentsByArticleId = (req, res) => {
  const { article_id } = req.params;
  console.log(req);
  addCommentsById(author, body, article_id).then((response) => {
    res.status(201).send(response);
  });
};
