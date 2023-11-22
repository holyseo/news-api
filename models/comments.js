const db = require("../db/connection");

exports.selectCommentsByArticleId = (id) => {
  if (!id || isNaN(id)) {
    return Promise.reject({ status: 400, msg: "article_id not found" });
  }
  return db
    .query(
      `SELECT * FROM comments where article_id = $1 ORDER BY created_at DESC ;`,
      [id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "no comments found" });
      }
      return rows;
    });
};
