const { addCommentsById } = require("../models/comments");

exports.postCommentsByArticleId = (req, res) => {
  const { article_id } = req.params;
  addCommentsById(author, body, article_id).then((response) => {
    console.log(response);
    res.status(201).send(response);
  });
};
